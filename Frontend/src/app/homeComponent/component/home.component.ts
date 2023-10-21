import { AfterViewInit, Component, OnInit } from "@angular/core";
import { CommonService } from "../../common.service";
import { HttpClient } from "@angular/common/http";
import * as feather from 'feather-icons';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit,AfterViewInit{
    isAdmin: boolean = false;
    itemList = [];

    constructor(private common: CommonService, private http: HttpClient) {
        this.isAdmin = this.common.isAdmin;
    }

    ngOnInit(): void {
        this.getItemList();
    }

    ngAfterViewInit(): void {
        feather.replace();         
    }

    getItemList() {
        this.http.get("http://localhost:3000/api/items").subscribe(result => {
            if(result && result !== undefined) {
                this.itemList = result['items'];
                this.itemList = this.itemList.concat(this.itemList);
                this.itemList.forEach(item => {
                    item.cartQty = 0;
                })
            }
        });
    }

    changeQty(data, opr) {
        if(opr === "subtract")
            data.cartQty -= 1;
        else    
            data.cartQty += 1;
    }
}