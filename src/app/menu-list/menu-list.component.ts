import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MenuService } from 'src/services/menu.service';
import { MenuSection } from 'src/classes/menuSection';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {
  public menu = this.menuService.menu;

  constructor(private titleService: Title, private menuService: MenuService) {
    titleService.setTitle('Список меню');
  }


  ngOnInit(): void {
  }

  triggerExpand(id: string) {
    this.menuService.triggerSectionExpand(id);
  }

  moveSection(sectionId: string, up: boolean) {
    this.menuService.moveSection(sectionId, up);
  }

  deleteSection(id: string) {
    this.menuService.deleteSection(id);
  }

  deleteItem(id: string) {
    this.menuService.deleteItem(id);
  }



}

