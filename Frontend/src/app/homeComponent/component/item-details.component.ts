import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: 'app-item-detail',
    templateUrl: './item-details.component.html',
    styleUrls: ['./home.component.scss']
})

export class ItemDetails implements OnInit{
    @Output() closeItemDetails:EventEmitter<boolean> = new EventEmitter();
    @Input() item;

    selectedImage = '';
    selectedColor: any;

    constructor() { }

    ngOnInit(): void {
        this.selectedColor = this.item.colors[0]
        this.selectedImage = this.selectedColor.images.length !== 0? this.selectedColor.images[0]: '../assets/No-Image-Placeholder.svg';
    }

    selectImage(image) {
        this.selectedImage = image;
    }
}