import { NgModule } from "@angular/core";
import { HomeComponent } from "./component/home.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CommonService } from "../common.service";
import { HomeRouterModule } from "./home-routing.module";
import { ItemDetails } from "./component/item-details.component";

@NgModule({
    declarations: [
        HomeComponent,
        ItemDetails
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        HomeRouterModule
    ],
    providers: [CommonService]
})

export class HomeModule { }