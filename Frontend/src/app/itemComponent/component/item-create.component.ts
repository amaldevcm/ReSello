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
        id: null,
        name: null,
        type: null,
        cost: null,
        selling: null,
        image: null,
        status: null,
        description: null,
        discount: null,
    };
    
    @Input() isEdited = false;
    @Output() output = new EventEmitter<any>();

    itemForm: FormGroup;
    constructor(private common: CommonService) {
        this.itemForm = new FormGroup({
            name: new FormControl('', Validators.required),
            type: new FormControl('', Validators.required),
            cost: new FormControl('', Validators.required),
            selling: new FormControl('', Validators.required),
            image: new FormControl(''),
            status: new FormControl(''),
            description: new FormControl(''),
            discount: new FormControl('')
        })
    }

    ngOnInit(): void {
        if(this.isEdited) {
            this.data.status = this.data.status === 'Active'? true: false;
        }
    }

    saveItem() {
        let postData = {
            id: this.isEdited? this.data.id: null,
            name: this.data.name,
            type: this.data.type,
            cost: this.data.cost,
            selling: this.data.selling,
            image: this.data.image,
            description: this.data.description,
            discount: this.data.discount,
            status: this.data.status? 'Active': 'Inactive',
        }

        if(this.isEdited) {
            this.common.put('items', {item: postData}).subscribe(result => {
                if(result !== undefined && result['status'] === 'Success') {
                    console.log('item saved');
                    this.cancel();
                } else {
                    console.log('item not saved');
                }
            });
        } else {
            this.common.post('items', {item: postData}).subscribe(result => {
                if(result !== undefined && result['status'] === 'Success') {
                    console.log('item saved');
                    this.cancel();
                } else {
                    console.log('item not saved');
                }
            });
        }
    }

    cancel() {
        if(this.isEdited) {
            this.output.emit();
        } else {
            window.history.back();
        }
    }

    setImage(event, callFrom) {
        let url = URL.createObjectURL(event.target.files[0]);
        if(callFrom === 'baseImage') {
            this.data.image = url;
        }
    }
}