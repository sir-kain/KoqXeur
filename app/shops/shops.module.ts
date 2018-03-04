import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";

import { ShopsRoutingModule } from "./shops-routing.module";
import { ShopService } from "./shared/shop.service";
import { ShopsComponent } from "./shops.component";

@NgModule({
    imports: [
        NativeScriptModule,
        ShopsRoutingModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        ShopsComponent
    ],
    providers: [
        ShopService,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ShopsModule { }
