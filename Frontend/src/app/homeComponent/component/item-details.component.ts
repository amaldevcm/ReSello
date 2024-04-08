import { Component } from "@angular/core";

@Component({
    selector: 'app-item-detail',
    templateUrl: './item-details.component.html',
    styleUrls: ['./home.component.scss']
})

export class ItemDetails {
    selectedImage = 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg';

    constructor() {}

    selectImage(image) {
        this.selectedImage = image;
    }
}