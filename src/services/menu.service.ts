import { MenuItem } from './../classes/menuItem';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { deserializeArray, serialize } from 'class-transformer';
import { BehaviorSubject, EMPTY, of } from 'rxjs';
import { catchError, map, switchMap, take, tap, skip, mapTo } from 'rxjs/operators';
import { MenuSection } from 'src/classes/menuSection';
import { KeyValue } from '@angular/common';

const menuStorageKey = 'menu';
const menuFile = './assets/menu.json';

@Injectable({
    providedIn: 'root',
})
export class MenuService implements OnDestroy {
    public menu = new BehaviorSubject<Array<MenuSection>>([]);
    constructor(private http: HttpClient) {
        // skip пропустит значение инициализации, чтобы не перезатирать им данные в local storage
        this.menu.pipe(skip(1), tap(x => console.log('Поступили изменения меню', x))).subscribe(data => this._save(data));
        this._importList();
    }

    ngOnDestroy(): void {
        this.menu.complete();
    }

    private _save(data: MenuSection[]) {
        localStorage.setItem(menuStorageKey, serialize(data));
    }

    deleteAll() {
        localStorage.clear();
        this.menu.next([])
    }

    private _importList() {
        of(localStorage.getItem(menuStorageKey)).pipe(
            take(1),
            switchMap(data => data && data.length && data != '[]' ? of(data) : this.http.get(menuFile, { responseType: 'text' })),
            map(x => deserializeArray(MenuSection, x)),
            catchError(err => {
                this.deleteAll();
                console.error('Ошибка при импорте данных', err)
                return EMPTY;
            }),
        ).subscribe(data => this.menu.next(data));
    }

    private _getSection(sectionId: string, array: MenuSection[] = this.menu.getValue()): [MenuSection | null, number] {
        let section = array.find(x => x.id == sectionId);
        if (section) return [section, array.indexOf(section)];

        // посмотрим на уровень ниже
        for (let i = 0; i < array.length; i++) {
            let sectionData = this._getSection(sectionId, array[i].sections);
            if (sectionData[0]) return sectionData;
        }

        return [null, -1];
    }

    getSection(sectionId: string): MenuSection | null {
        let sectionData = this._getSection(sectionId);
        return sectionData[0];
    }

    // null - возникла ошибка, неправильный id; undefined - секция есть, но нет родителя, верхнеуровневая
    private _getSectionParent(sectionId: string, array: MenuSection[] = this.menu.getValue()): MenuSection | null | undefined {
        // в начале проверим - не является ли наша секция сама верхнеуровневой
        let section = array.find(x => x.id == sectionId);
        if (section) return undefined;

        for (let i = 0; i < array.length; i++) {
            // ищем тот верхнеуровневый элемент, у которого в секциях есть такой элемент с переданным id 
            let section = array.find(x => x.sections.find(y => y.id === sectionId));
            if (section) return section;

            let deepSection = this._getSectionParent(sectionId, array[i].sections);
            if (deepSection) return deepSection;
        }

        return null;
    }

    getSectionParent(sectionId: string): MenuSection | null | undefined {
        return this._getSectionParent(sectionId);
    }

    private _getItemParent(itemId: string, array: MenuSection[] = this.menu.getValue()): MenuSection | null | undefined {
        for (let i = 0; i < array.length; i++) {
            let section = array.find(x => x.items.find(y => y.id === itemId));
            if (section) return section;

            let deepSection = this._getItemParent(itemId, array[i].sections);
            if (deepSection) return deepSection;
        }

        return null;
    }

    private _deleteSection(sectionId: string, array: MenuSection[]): MenuSection | null {
        let sectionData = this._getSection(sectionId, array);
        if (!sectionData[0] || sectionData[1] < 0) return null;

        return array.splice(sectionData[1], 1)[0];
    }

    deleteSection(sectionId: string): MenuSection | null {
        let data = this.menu.getValue();

        let parentSection = this._getSectionParent(sectionId, data);
        let result = this._deleteSection(sectionId, parentSection?.sections ?? data);
        this.menu.next(data);

        if (result) console.info('Удалили секцию "' + result.name + '"')
        return result;
    }

    private _moveSection(fromPosition: number, toPosition: number, array: MenuSection[] = this.menu.getValue()): boolean {
        if (!array || toPosition < 0 || toPosition > array.length - 1 || fromPosition < 0 || fromPosition > array.length - 1) return false;

        return !!array.splice(toPosition, 0, array.splice(fromPosition, 1)[0]);
    };

    moveSection(sectionId: string, up: boolean): boolean {
        let data = this.menu.getValue();

        let sectionData = this._getSection(sectionId, data);
        if (!sectionData[0] || sectionData[1] < 0) return false;

        let sectionParent = this._getSectionParent(sectionId, data);
        if (sectionParent === null) return false;

        let result = this._moveSection(sectionData[1], up ? sectionData[1] - 1 : sectionData[1] + 1, sectionParent === undefined ? data : sectionParent.sections);
        this.menu.next(data);
        return result;
    }

    moveSectionToParent(sectionId: string, parentId: string): boolean {
        // в начале найдём новую секцию
        let data = this.menu.getValue();
        let sectionNewParent = this._getSection(parentId, data)[0];

        // удалим из старого места текущую секцию
        let sectionToMove = this.deleteSection(sectionId);
        if (!sectionToMove) return false;

        // добавим в новое место
        if (!sectionNewParent) data.push(sectionToMove); // в корень
        else sectionNewParent.sections.push(sectionToMove);

        this.menu.next(data);
        console.info(`Переместили "${sectionToMove.name}" в ${sectionNewParent ? sectionNewParent.name : 'корень'}`);
        return true;
    }

    triggerSectionExpand(sectionId: string) {
        let data = this.menu.getValue();
        let section = this._getSection(sectionId, data)[0];
        if (!section) return;

        section.isExpanded = !section.isExpanded;
        this.menu.next(data);
    }

    private _getSectionList(list: Array<KeyValue<string, string>> = new Array<KeyValue<string, string>>(), array: MenuSection[] = this.menu.getValue()) {
        array.forEach(x => list.push({ key: x.id, value: x.name }));

        // посмотрим на уровень ниже
        for (let i = 0; i < array.length; i++) {
            this._getSectionList(list, array[i].sections);
        }

        return list;
    }

    getSectionList(): Array<KeyValue<string, string>> {
        let sections = new Array<KeyValue<string, string>>();
        sections.push({ key: '', value: 'Основной - первый уровень' });
        console.info('Список секций:', this._getSectionList(sections));

        return sections;
    }

    changeSectionData(changedSection: MenuSection, parentId: string) {
        let data = this.menu.getValue();
        let section = this._getSection(changedSection.id, data)[0];

        // новая секция
        if (!section) {
            let parentSection = this._getSection(parentId, data)[0];
            if (!parentSection) data.push(changedSection) // корень
            else parentSection?.sections.push(changedSection);
        }
        else {
            section.name = changedSection.name;
            section.color = changedSection.color;
        }

        this.menu.next(data);
    }

    private _getItem(itemId: string, array: MenuSection[] = this.menu.getValue()): [MenuItem | null, number] {
        for (let i = 0; i < array.length; i++) {
            let item = array[i].items.find(x => x.id === itemId);
            if (item) return [item, array[i].items.indexOf(item)];

            let itemDeeper = this._getItem(itemId, array[i].sections);
            if (itemDeeper[0]) return itemDeeper;
        }

        return [null, -1];
    }

    getItem(itemId: string): MenuItem | null {
        return this._getItem(itemId)[0];
    }

    changeItemData(changedItem: MenuItem, parentId: string) {
        let data = this.menu.getValue();
        let item = this._getItem(changedItem.id, data)[0];

        // новая позиция
        if (!item) {
            let parentSection = this._getSection(parentId, data)[0];
            if (parentSection) parentSection.items.push(changedItem);
            else {
                parentSection = new MenuSection();
                parentSection.items.push(changedItem)
                data.push(parentSection);
            }
        }
        else {
            item.name = changedItem.name;
            item.sale = changedItem.sale;
        }

        this.menu.next(data);
    }

    private _deleteItem(itemId: string, array: MenuItem[]): MenuItem | null {
        let itemData = this._getItem(itemId);
        if (!itemData[0] || itemData[1] < 0) return null;

        return array.splice(itemData[1], 1)[0];
    }

    deleteItem(itemId: string): MenuItem | null {
        let data = this.menu.getValue();

        let parentSection = this._getItemParent(itemId, data);
        if (!parentSection) return null;

        let result = this._deleteItem(itemId, parentSection?.items);
        this.menu.next(data);

        if (result) console.info('Удалили позицию "' + result.name + '"')
        return result;
    }
}
