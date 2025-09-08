import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CommonService } from "src/app/app-common/common.service";

@Component({
    selector: 'app-item-create',
    templateUrl: './item-create.component.html',
    styleUrls: ['./item.component.scss']
})

export class ItemCreateComponent implements OnInit {
    @Input() data = {
        _id: null,
        userId: null,
        name: null,
        category: null,
        price: null,
        selling: null,
        image: null,
        status: 'pending',
        description: null,
    };
    @Input() isEdited = false;
    @Output() output = new EventEmitter<any>();

    baseImg = null;

    itemForm: FormGroup;
    constructor(private common: CommonService) {
        this.itemForm = new FormGroup({
            name: new FormControl('', Validators.required),
            category: new FormControl('', Validators.required),
            price: new FormControl('', Validators.required),
            selling: new FormControl('', Validators.required),
            image: new FormControl(''),
            status: new FormControl('pending'),
            description: new FormControl('')
        })
    }

    ngOnInit(): void {
    }

    saveItem() {
        this.common.uploadToAws(this.baseImg);
        // let postData = {
        //     _id: this.isEdited ? this.data._id : null,
        //     userId: this.common.getUserData()._id,
        //     name: this.data.name,
        //     category: this.data.category,
        //     price: this.data.price,
        //     selling: this.data.selling,
        //     image: this.data.image,
        //     description: this.data.description,
        //     status: this.data.status ? 'Active' : 'Inactive',
        // }

        // if (this.isEdited) {
        //     this.common.put('items', { item: postData }).subscribe(result => {
        //         if (result !== undefined && result['status'] === 'Success') {
        //             console.log('item saved');
        //             this.cancel();
        //         } else {
        //             console.log('item not saved');
        //         }
        //     });
        // } else {
        //     this.common.post('items', { item: postData }).subscribe(result => {
        //         if (result !== undefined && result['status'] === 'Success') {
        //             console.log('item saved');
        //             this.cancel();
        //         } else {
        //             console.log('item not saved');
        //         }
        //     });
        // }
    }

    cancel() {
        // if(this.isEdited) {
        this.output.emit();
        // } else {
        //     window.history.back();
        // }
    }

    setImage(event, callFrom) {
        this.baseImg = event.target.files[0];
        let url = URL.createObjectURL(event.target.files[0]);
        if (callFrom === 'baseImage') {
            this.data.image = url;
        }
    }

    removeImg() {
        this.data.image = null;
    }
}