import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Colors, MenuSection } from 'src/classes/menuSection';
import { MenuService } from 'src/services/menu.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html'
})
export class SectionComponent implements OnInit {
  public colors = Colors;
  public sections = this.menuService.getSectionList();
  public sectionId: string;
  parentId: string;
  public currentSection: MenuSection;

  constructor(private titleService: Title, private menuService: MenuService, private activateRoute: ActivatedRoute, private router: Router) {
    this.sectionId = (activateRoute.snapshot.params['sectionId'] as string)?.replace('undefined', ''); // 1) режим редактирования
    this.parentId = (activateRoute.snapshot.params['parentId'] as string)?.replace('undefined', '');   // 2) режим добавления в родителя  3) иначе - создание в корне
    titleService.setTitle(this.sectionId ? 'Редактирование раздела' : 'Новый раздел');

    this.currentSection = this.sectionId ? menuService.getSection(this.sectionId) ?? new MenuSection() : new MenuSection();

    // если такого id родителя нет или не передали - делаем секцию верхнеуровневой
    this.currentSection.parentIndex = this.sections.findIndex(x => x.key == this.parentId) < 0 ? 0 : this.sections.findIndex(x => x.key == this.parentId);
  }

  ngOnInit(): void {
  }

  submit() {
    this.menuService.changeSectionData(this.currentSection, this.sections[this.currentSection.parentIndex].key);

    if (this.sectionId && this.parentId != this.sections[this.currentSection.parentIndex].key)
      this.menuService.moveSectionToParent(this.sectionId, this.sections[this.currentSection.parentIndex].key);
    //TODO: проверка на неудачное выполнение перемещения и вывод сообщения


    this.router.navigate(['']);
  }

  getSectionNameByID(sectionId: string): string | undefined {
    return this.sections.find(x => x.key == sectionId)?.value;
  }

}
