import { MenuItem } from './menuItem';
import { Guid } from "guid-typescript";
import { Type, Expose } from 'class-transformer/decorators';
import 'reflect-metadata';

export class MenuSection {
    public constructor(init?: Partial<MenuSection>) {
        Object.assign(this, init);
    }

    @Expose()
    public id: string = Guid.create().toString();

    @Expose()
    public name: string = '';

    @Expose()
    @Type(() => MenuItem)
    public items: MenuItem[] = [];

    @Expose()
    @Type(() => MenuSection)
    public sections: MenuSection[] = [];

    @Expose()
    public isExpanded: boolean = false;

    @Expose()
    public color: string = '#fff';


    public isDropDownVisible: boolean = false;
}
