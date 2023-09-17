import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})

export class ItemsComponent implements OnInit{
    itemList = [];

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.getItemList();    
    }

    getItemList() {
        this.http.get("http://localhost:3000/api/items").subscribe(response => {
            if(response && response !== undefined) {
                this.itemList = response['items'];
            }
        })
    }

} 