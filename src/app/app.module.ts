import { MenuService } from 'src/services/menu.service';
import { HeaderComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SectionComponent } from './section/section.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { FormsModule } from '@angular/forms';
import { ItemComponent } from './item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SectionComponent,
    MenuListComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [MenuService],
  bootstrap: [AppComponent, HeaderComponent]
})
export class AppModule { }
