import { Component, OnInit } from "@angular/core";
import { CommonService } from "../../common.service";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit{
    isAdmin: boolean = false;
    itemList = [];

    constructor(private common: CommonService, private http: HttpClient) {
        this.isAdmin = this.common.isAdmin;
    }

    ngOnInit(): void {
        this.getItemList();
    }

    getItemList() {
        this.http.get("http://localhost:3000/api/items").subscribe(result => {
            if(result && result !== undefined) {
                this.itemList = result['items'];
            }
        });
    }
}