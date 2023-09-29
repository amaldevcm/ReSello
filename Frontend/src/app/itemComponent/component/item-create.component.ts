import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

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
        description: null
    };
    @Input() isEdited = false;
    @Output() output = new EventEmitter<any>();

    itemForm: FormGroup;
    constructor(private http: HttpClient) {
        this.itemForm = new FormGroup({
            name: new FormControl('',Validators.required),
            type: new FormControl('',Validators.required),
            cost: new FormControl('',Validators.required),
            selling: new FormControl('',Validators.required),
            image: new FormControl('',Validators.required),
            status: new FormControl(''),
            description: new FormControl('')
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
            status: this.data.status? 'Active': 'Inactive',
        }

        if(this.isEdited) {
            this.http.put('http://localhost:3000/api/items',{item: postData}).subscribe(result => {
                if(result !== undefined && result['status'] === 'Success') {
                    console.log('item saved');
                    this.cancel();
                } else {
                    console.log('item not saved');
                }
            });
        } else {
            this.http.post('http://localhost:3000/api/items',{item: postData}).subscribe(result => {
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
}