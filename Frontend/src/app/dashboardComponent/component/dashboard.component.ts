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
        this.common.get('items/listing?id=' + this.user._id).subscribe({
            next: (result) => {
                if (result) {
                    this.analytics = result['analytics'];
                    this.listings = result['items'];
                }
            },

            error: (error) => {
                if (error.status === 401 || error.status === 403) {
                    this.common.logout();
                }
                console.error('There was an error!', error);
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