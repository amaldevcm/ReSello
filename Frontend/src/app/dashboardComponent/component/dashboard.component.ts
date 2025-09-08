import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonService } from "src/app/app-common/common.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {
    user = null;
    activeTab = 'profile';
    analytics: Object = {};
    listings = [];

    constructor(private common: CommonService, private router: Router) {
        this.user = common.getUserData();
    }

    ngOnInit(): void {
        if (this.user === null) {
            this.router.navigate(['/account/login']);
        }
        this.getListings();
    }

    getListings() {
        this.common.get('items/listing?id=' + this.user._id).subscribe((result) => {
            if (result) {
                this.analytics = result['analytics'];
                this.listings = result['items'];
            }
        });
    }

    setActiveTab(tab) {
        this.activeTab = tab;
    }

    logout() {
        localStorage.clear();
        this.common.setUserData(null);
    }
}