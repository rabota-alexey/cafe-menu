import { Guid } from "guid-typescript";
import { Expose } from 'class-transformer/decorators';

export class MenuItem {
    public constructor(init?: Partial<MenuItem>) {
        Object.assign(this, init);
    }

    @Expose()
    public id: string = Guid.create().toString();

    @Expose()
    public name: string = '';

    @Expose()
    public sale: number = 0;
}
