import { NgModule } from "@angular/core";
import { ItemsComponent } from "./component/item.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ItemRoutingModule } from "./item-routing.module";
import { ItemCreateComponent } from "./component/item-create.component";
import { AppCommonModule } from "../app-common/common.module";

@NgModule({
    declarations: [
        ItemsComponent,
        ItemCreateComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ItemRoutingModule,
        ReactiveFormsModule,
        AppCommonModule
    ]
})

export class ItemModule { }