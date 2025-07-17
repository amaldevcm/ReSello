import { Component } from "@angular/core";
import { CommonService } from "src/app/app-common/common.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent {
    user= null;
    constructor(private common: CommonService) {
        this.user = common.user;
        console.log(this.user);
    }
}