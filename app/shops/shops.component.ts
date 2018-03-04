import { Component, OnInit } from "@angular/core";
import { ObservableArray } from "data/observable-array";
import { RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-pro-ui/listview";

import "rxjs/add/operator/finally";
import { Shop } from "./shared/shop.model";
import { ShopService } from "./shared/shop.service";

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "shops", loadChildren: "./shops/shops.module#ShopsModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "Shops",
    moduleId: module.id,
    templateUrl: "./shops.component.html"
})
export class ShopsComponent implements OnInit {
    private _isLoading: boolean = false;
    private _shops: ObservableArray<Shop> = new ObservableArray<Shop>([]);

    constructor(private _shopService: ShopService,
                private _routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
        this._isLoading = true;

        /* ***********************************************************
        * The data is retrieved remotely from FireBase.
        * The actual data retrieval code is wrapped in a data service.
        * Check out the service in shops/shared/shop.service.ts
        *************************************************************/
        this._shopService.load()
            .finally(() => this._isLoading = false)
            .subscribe((shops: Array<Shop>) => {
                this._shops = new ObservableArray(shops);
                this._isLoading = false;
            });
    }

    get shops(): ObservableArray<Shop> {
        return this._shops;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }
}
