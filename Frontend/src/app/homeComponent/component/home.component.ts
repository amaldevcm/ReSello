import { Component } from "@angular/core";
import { CommonService } from "../../common.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})

export class HomeComponent {
    isAdmin: boolean = false;
    constructor(private common: CommonService) {
        this.isAdmin = this.common.isAdmin;
    }
}