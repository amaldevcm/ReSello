import { Component, Input } from "@angular/core";
import { CommonService } from "src/app/app-common/common.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html'
})

export class ProfileComponent {
    @Input() analytics;

    user:any;

    constructor(private common: CommonService) {
        this.user = common.getUserData();
    }
    
}