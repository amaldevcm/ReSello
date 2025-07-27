import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-listing',
    templateUrl: './listing.component.html'
})

export class ListingComponent {
    @Input() listings;

    showListing = true;
    selectedItem = null;
    editItem = false;

    constructor() { }
    
    createNew() {
        this.showListing = false;
    }

    cancelEdit() {
        this.showListing = true;
    }
}