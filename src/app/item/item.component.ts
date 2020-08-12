import { MenuItem } from 'src/classes/menuItem';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MenuService } from 'src/services/menu.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html'
})
export class ItemComponent implements OnInit {
  public itemId: string;
  parentId: string;
  currentItem: MenuItem;

  constructor(private titleService: Title, private menuService: MenuService, private activateRoute: ActivatedRoute, private router: Router) {
    this.itemId = (activateRoute.snapshot.params['itemId'] as string)?.replace('undefined', '');
    this.parentId = (activateRoute.snapshot.params['parentId'] as string)?.replace('undefined', '');
    titleService.setTitle(this.itemId ? 'Редактирование позиции' : 'Новая позиция');

    this.currentItem = this.itemId ? menuService.getItem(this.itemId) ?? new MenuItem() : new MenuItem();
  }

  ngOnInit(): void {
  }

  submit() {
    this.menuService.changeItemData(this.currentItem, this.parentId);
    // //TODO: проверка на неудачное выполнение перемещения и вывод сообщения

    this.router.navigate(['']);
  }

}
