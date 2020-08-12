import { Guid } from "guid-typescript";
import { Expose } from 'class-transformer/decorators';

export class MenuItem {
    public constructor(init?: Partial<MenuItem>) {
        Object.assign(this, init);
    }

    public id: string = Guid.create().toString();

    public name: string = '';

    public sale: number = 0;

    @Expose()
    public isDropDownVisible: boolean = false;
}
