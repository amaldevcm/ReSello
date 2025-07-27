import { NgModule } from "@angular/core";
import { CommonService } from "../app-common/common.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DashboardComponent } from "./component/dashboard.component";
import { DashboardRouting } from "./dashboard-routing.module";
import { ListingComponent } from "./component/listing.component";
import { ProfileComponent } from "./component/profile.component";
import { AnalyticsComponent } from "./component/analytics.component";
import { ItemModule } from "../itemComponent/item.module";

@NgModule({
    declarations: [
        DashboardComponent,
        ListingComponent,
        ProfileComponent,
        AnalyticsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        DashboardRouting,
        ItemModule
    ],
    exports: [],
    providers: [CommonService]
})

export class DashboardModule {}