import { AfterViewInit, Component, OnInit } from "@angular/core";
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
    cart = [];
    showCartItems = false;
    totalAmount = 0;
    showItemDetails = true;
    selectedItem = {}

    constructor(private common: CommonService, private http: HttpClient) {
        this.isAdmin = this.common.isAdmin;
        this.cart = this.common.cart;
    }

    ngOnInit(): void {
        this.getItemList();
    }

    getItemList() {
        this.http.get("http://localhost:3000/api/items").subscribe(result => {
            if(result && result !== undefined) {
                result['items'].forEach(item =>{
                    item.discountPrice = item.selling - (item.selling*item.discount)/100;
                });
                this.itemList = JSON.parse(JSON.stringify(result['items']));
                this.itemList = this.itemList.concat(result['items']);
                this.itemList.forEach(item => {
                    item.cartQty = 0;
                });
                this.selectedItem = this.itemList[0];
            }
        });
    }

    changeQty(data, opr) {
        data.cartQty = Number(data.cartQty);
        if(opr === "subtract") {
            data.cartQty -= 1;
        } else {
            data.cartQty += 1;
        }
        this.calculateTotalAmount();
    }

    calculateTotalAmount() {
        this.totalAmount = 0;
        this.cart = this.itemList.filter(data => data.cartQty > 0);
        this.common.cart = this.cart;
        this.cart.forEach(item => {
            this.totalAmount += Number(item.cartQty)*Number(item.discountPrice);
        });
    }

    toggleCartItems(calledFrom = 'close', data=null){
        if(calledFrom === 'close'){
            this.showItemDetails = false;
            this.showCartItems = false;
        } else if(calledFrom === 'item') {
            this.showItemDetails = true;
            this.showCartItems = false;
        } else {
            this.showItemDetails = false;
            this.showCartItems = !this.showCartItems;
        }
        this.selectedItem = data;
    }

    toggleItemDetails(itemData) {
        this.showItemDetails = true;
    }

    btnClick(){
        console.log('called')
    }
}

