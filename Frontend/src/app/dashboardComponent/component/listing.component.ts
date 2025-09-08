import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'app-listing',
    templateUrl: './listing.component.html'
})

export class ListingComponent implements OnInit {
    @Input() listings;

    showListing = true;
    selectedItem = null;
    editItem = false;

    constructor() { }

    ngOnInit(): void {
    }

    createNew() {
        this.editItem = false;
        this.selectedItem = {
            id: null,
            name: null,
            type: null,
            cost: null,
            selling: null,
            image: null,
            status: null,
            description: null,
        };
        this.showListing = false;
    }

    cancelEdit() {
        this.showListing = true;
    }
}