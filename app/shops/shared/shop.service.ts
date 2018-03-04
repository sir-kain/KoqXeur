import { Injectable, NgZone } from "@angular/core";
import { Http } from "@angular/http";
import firebase = require("nativescript-plugin-firebase");
// import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/catch";
import { Observable } from "rxjs/Observable";

import { Config } from "../../shared/config";
import { Shop } from "./shop.model";

const editableProperties = [
    "doors",
    "imageUrl",
    "luggage",
    "name",
    "price",
    "seats",
    "transmission",
    "class"
];

/* ***********************************************************
* This is the master detail data service. It handles all the data operations
* of retrieving and updating the data. In this case, it is connected to Firebase and
* is using the {N} Firebase plugin. Learn more about it here:
* https://github.com/EddyVerbruggen/nativescript-plugin-firebase
* The {N} Firebase plugin needs some initialization steps before the app starts.
* Check out how it is imported in the main.ts file and the actual script in /shared/firebase.common.ts file.
*************************************************************/
@Injectable()
export class ShopService {
    private static cloneUpdateModel(shop: Shop): object {
        return editableProperties.reduce((a, e) => (a[e] = shop[e], a), {}); // tslint:disable-line:ban-comma-operator
    }

    private _shops: Array<Shop> = [];

    constructor(private _ngZone: NgZone) { }

    getShopById(id: string): Shop {
        if (!id) {
            return;
        }

        return this._shops.filter((shop) => {
            return shop._id === id;
        })[0];
    }

    load(): Observable<any> {
        return new Observable((observer: any) => {
            const path = "shops";

            const onValueEvent = (snapshot: any) => {
                this._ngZone.run(() => {
                    const results = this.handleSnapshot(snapshot.value);
                    observer.next(results);
                });
            };
            firebase.addValueEventListener(onValueEvent, `/${path}`);
        }).catch(this.handleErrors);
    }

    update(shopModel: Shop): Promise<any> {
        const updateModel = ShopService.cloneUpdateModel(shopModel);

        return firebase.update("/shops/" + shopModel._id, updateModel);
    }

    uploadImage(remoteFullPath: string, localFullPath: string): Promise<any> {
        return firebase.uploadFile({
            localFullPath,
            remoteFullPath,
            onProgress: null
        });
    }

    private handleSnapshot(data: any): Array<Shop> {
        this._shops = [];

        if (data) {
            for (const id in data) {
                if (data.hasOwnProperty(id)) {
                    this._shops.push(new Shop(data[id]));
                }
            }
        }

        return this._shops;
    }

    private handleErrors(error: Response): Observable<any> {
        return Observable.throw(error);
    }
}
