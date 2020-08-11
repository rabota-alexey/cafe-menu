import { MenuSection } from 'src/classes/menuSection';
import { MenuService } from 'src/services/menu.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { tap, take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public menu = new BehaviorSubject<Array<MenuSection>>([]);

  constructor(private menuService: MenuService) { }

  ngOnDestroy(): void {
    this.menu.complete();
  }

  ngOnInit(): void {
    this.menuService.getList().pipe(take(1)).subscribe(data => this.menu.next(data));
    this.menu.subscribe(data => this.menuService.save(data)); // любые изменения списка будут сохранены сервисом
  }

  addSection() {
  }

  addItem() {

  }

  triggerExpand(id: string) {
    let data = this.menu.getValue();
    let section = this.getSectionById(data, id);

    if (!section) return;
    section.isExpanded = !section.isExpanded;
    this.menu.next(data);
  }

  moveSection(parentId: string, from: number, to: number) {
    let data = this.menu.getValue();

    // верхний уровень
    if (!parentId) {
      this.moveArray(data, from, to);
      this.menu.next(data);
      return;
    }

    // все остальные
    let parentSection = this.getSectionById(data, parentId);
    if (!parentSection || !parentSection.sections) return;
    this.moveArray(parentSection.sections, from, to);

    this.menu.next(data);
  }

  private getSectionById(array: MenuSection[], id: string): MenuSection | null {
    let section = array.find(x => x.id == id);
    if (section) return section;

    // посмотрим на уровень ниже
    for (let i = 0; i < array.length; i++) {
      let section = this.getSectionById(array[i].sections, id);
      if (section) return section;
    }

    return null;
  }

  private moveArray(array: MenuSection[], from: number, to: number) {
    if (!array || to < 0 || to > array.length - 1 || from < 0 || from > array.length - 1) return;

    array.splice(to, 0, array.splice(from, 1)[0]);
  };

}
