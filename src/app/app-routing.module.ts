import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemComponent } from './item/item.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { SectionComponent } from './section/section.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MenuListComponent,
  },
  {
    path: 'section',
    component: SectionComponent,
  },
  {
    path: 'item',
    component: ItemComponent,
  },
  {
    path: '**',
    component: MenuListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', enableTracing: false })], // scrollPositionRestoration автоматически пролистывает окно наверх при переходе на новый роут
  exports: [RouterModule]
})
export class AppRoutingModule { }
