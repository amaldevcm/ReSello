import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CommonService } from "src/app/app-common/common.service";

@Component({
    selector: 'app-item-detail',
    templateUrl: './item-details.component.html',
    styleUrls: ['./home.component.scss']
})

export class ItemDetails implements OnInit {
    @Output() closeItemDetails: EventEmitter<boolean> = new EventEmitter();
    @Output() itemPurchased: EventEmitter<void> = new EventEmitter();
    @Input() item: any = null;

    selectedImage = '';
    selectedColor: any;

    constructor(private common: CommonService) { }

    ngOnInit(): void {
        // this.selectedColor = this.item.colors[0]
        // this.selectedImage = this.selectedColor.images.length !== 0? this.selectedColor.images[0]: '../assets/No-Image-Placeholder.svg';
    }

    selectImage(image: string) {
        this.selectedImage = image;
    }

    isOwnItem(): boolean {
        const currentUser = this.common.getUserData();
        return !!(currentUser && this.item && String(this.item.userId) === String(currentUser['_id']));
    }

    buyItem() {
        if (!this.item || !this.item._id) {
            return;
        }
        if (!confirm(`Buy "${this.item.name}" for ₹${this.item.price}?`)) {
            return;
        }
        this.common.post('orders', { itemId: this.item._id }).subscribe({
            next: (result) => {
                if (result && result['status'] === 'Success') {
                    this.itemPurchased.emit();
                } else {
                    console.log('order not placed');
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
}