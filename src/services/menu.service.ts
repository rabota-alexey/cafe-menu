import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { deserializeArray, serialize } from 'class-transformer';
import { Observable, of } from 'rxjs';
import { catchError, map, share, switchMap, tap } from 'rxjs/operators';
import { MenuSection } from 'src/classes/menuSection';

const menuStorageKey = 'nomia.menu';
const menuFile = '/assets/menu.json';

@Injectable({
    providedIn: 'root',
})
export class MenuService {
    constructor(private http: HttpClient) {
    }

    getList(): Observable<Array<MenuSection>> {
        return of(localStorage.getItem(menuStorageKey)).pipe(
            switchMap(data => data && data.length && data != '[]' ? of(data) : this.http.get(menuFile, { responseType: 'text' })),
            map(x => deserializeArray(MenuSection, x)),
            catchError(err => {
                this.deleteAll();
                return of([]);
            }),
            tap(x => this.save(x)),
            share()
        );
    }

    save(data: MenuSection[]) {
        localStorage.setItem(menuStorageKey, serialize(data));
    }

    deleteAll() {
        localStorage.clear();
    }

}
