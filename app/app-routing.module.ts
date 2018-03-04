import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/menu", pathMatch: "full" },
    { path: "login", loadChildren: "./login/login.module#LoginModule" },
    { path: "menu", loadChildren: "./menu/menu.module#MenuModule" },
    { path: "shops", loadChildren: "./shops/shops.module#ShopsModule" },
    { path: "cars", loadChildren: "./cars/cars.module#CarsModule" },
    { path: "signup", loadChildren: "./signup/signup.module#SignupModule" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
