import { AfterViewInit, Component, OnInit } from "@angular/core";
import { CommonService } from "../../app-common/common.service";
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
    showItemDetails = false;
    selectedItem = {
        name: 'lorem3',
        description: 'lorem30',
        selling: 2000,
        colors: [
            {
                color: '#111',
                colorName: 'Glossy white',
                images: [
                    'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
                    'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
                    'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg'
                ]
            }
        ]
    }

    constructor(private common: CommonService) {
        this.cart = this.common.cart;
        this.isAdmin = this.common.user.role === 'admin';
    }

    ngOnInit(): void {
        this.getItemList();
    }

    getItemList() {
        this.common.get("items").subscribe(result => {
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

    toggleItemDetails(itemData={}, action=false) {
        console.log('called toggle')
        this.showItemDetails = action;
    }

    btnClick(){
        console.log('called')
    }
}

