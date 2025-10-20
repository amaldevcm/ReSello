import { Component, Input, OnInit } from "@angular/core";
import * as moment from "moment";

@Component({
    selector: 'app-listing',
    templateUrl: './listing.component.html'
})

export class ListingComponent implements OnInit {
    @Input() listings;

    showListing = true;
    selectedItem = null;
    isEdited = false;
    searchText = null;

    constructor() { }

    ngOnInit(): void {
    }

    createNew() {
        this.isEdited = false;
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

    formatDate(date) {
        return moment(date).format('MMM DD YYYY');
    }

    capitalizeText(str) {
        if (str == null || str.length === 0) {
            return "-";
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    searchListing() {
        if (this.searchText == null) {
            return this.listings;
        }
        return this.listings.filter(item => item['name'].contains(this.searchText));
    }

    editListing(item) {
        this.showListing = false;
        this.selectedItem = item;
        this.isEdited = true;
    }

    deleteListing() {

    }
}