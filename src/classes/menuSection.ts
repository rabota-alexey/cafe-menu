import { MenuItem } from './menuItem';
import { Guid } from "guid-typescript";
import { Type, Expose } from 'class-transformer/decorators';
import 'reflect-metadata';

export class MenuSection {
    public constructor(init?: Partial<MenuSection>) {
        Object.assign(this, init);
    }

    public id: string = Guid.create().toString();

    public name: string = '';

    @Type(() => MenuItem)
    public items: MenuItem[] = [];

    @Type(() => MenuSection)
    public sections: MenuSection[] = [];

    public isExpanded: boolean = false;

    public color: string = 'transparent';


    @Expose()
    public isDropDownVisible: boolean = false;

    @Expose()
    public parentIndex: number = 0;
}


export const Colors = [
    '#FFAF8E',
    '#3AD7FF',
    '#FFB515',
    '#5EFAD2',
    '#CDDDCA',
    '#FD6C36',
    '#0092FF',
    '#FBED9A',
    '#32B69B',
    '#345B7E',
    '#ED368C',
    '#5151C2',
    '#FD98BC',
    '#B7EEE3',
    '#E9BEF8',
    '#9C0D64',
    '#002894',
    '#FC4242',
    '#C5D16C',
    '#73349F'
]
