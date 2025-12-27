import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CommonService } from "src/app/app-common/common.service";

@Component({
    selector: 'app-user-create',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user.component.scss']
})

export class UserCreateComponent implements OnInit {
    @Input() data: any = {
        name: null,
        email: null,
        password: null,
        mobile: null,
    };
    @Input() isEdited: boolean;
    @Output() output = new EventEmitter<any>();

    userForm: FormGroup;

    constructor(private http: HttpClient, private common: CommonService) { }

    ngOnInit(): void {
        this.userForm = new FormGroup({
            name: new FormControl('', Validators.required),
            mobile: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
            address: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
            confirmPass: new FormControl('', Validators.required),
            status: new FormControl()
        });

        if (this.isEdited) {
            this.data.status = this.data.status === 'Active' ? true : false;
            this.data.confirmPass = this.data.password;
        }
    }

    get f() {
        return this.userForm.controls;
    }

    saveNewUser() {
        // if(this.f.)
        if (this.data.password !== this.data.confirmPass) {
            this.data.confirmPass = '';
            this.data.password = '';
            console.log('Password mismatch');
        }
        console.log(this.data);
        let postData = {
            id: this.isEdited ? this.data.id : null,
            name: this.data.name,
            mobile: this.data.mobile,
            email: this.data.email,
            address: this.data.address,
            password: this.data.password,
            status: this.data.status ? 'Active' : 'Inactive',
        }

        if (this.isEdited) {
            this.common.put('users', { user: postData }).subscribe(result => {
                if (result !== undefined && result['status'] === 'Success') {
                    console.log('User saved');
                    this.cancel();
                } else {
                    console.log('User not saved');
                }
            });
        } else {
            this.common.post('users', { user: postData }).subscribe({
                next: (result) => {
                    if (result !== undefined && result['status'] === 'Success') {
                        console.log('User saved');
                        this.cancel();
                    } else {
                        console.log('User not saved');
                    }
                },


                error: (error) => {
                    if (error.status === 401 || error.status === 403) {
                        this.common.logout();
                    }
                    console.error('There was an error!', error.error);
                }
            });
        }
    }

    cancel() {
        if (this.isEdited) {
            this.output.emit();
        } else {
            window.history.back();
        }
    }
}