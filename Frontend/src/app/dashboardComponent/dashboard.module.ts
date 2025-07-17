import { NgModule } from "@angular/core";
import { CommonService } from "../app-common/common.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DashboardComponent } from "./component/dashboard.component";
import { DashboardRouting } from "./dashboard-routing.module";

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        DashboardRouting
    ],
    exports: [],
    providers: [CommonService]
})

export class DashboardModule {}