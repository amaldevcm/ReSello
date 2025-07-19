import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonService } from "src/app/app-common/common.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit{
    user = null;
    activeTab = 'analytics';

    constructor(private common: CommonService, private router: Router) {
        this.user = common.getUserData();
    }

    ngOnInit(): void {
        if(this.user === null) {
            this.router.navigate(['/account/login']);
        }
    }

    setActiveTab(tab) {
        this.activeTab = tab;
    }
}