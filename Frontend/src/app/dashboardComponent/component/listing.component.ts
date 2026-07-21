import { Component, Input, OnInit } from "@angular/core";
import * as moment from "moment";
import { CommonService } from "src/app/app-common/common.service";

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

    constructor(private common: CommonService) { }

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

    deleteListing(item) {
        if (!confirm('Delete this listing?')) {
            return;
        }
        this.common.delete('items', item._id).subscribe({
            next: (result) => {
                if (result && result['status'] === 'Success') {
                    this.listings = this.listings.filter(listing => listing._id !== item._id);
                } else {
                    console.log('item not deleted');
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