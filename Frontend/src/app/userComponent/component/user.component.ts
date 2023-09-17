import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import * as moment from "moment";

@Component({
    selector: 'app-item',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit{
    userList = [];
    isEdited = false;
    userData = {}

    constructor(private http: HttpClient) { }
    ngOnInit(): void {
        this.getUserList();
    }

    getUserList() {
        this.http.get('http://localhost:3000/api/users').subscribe(response => {
            console.log("user list", response);
            if(response && response !== undefined) {
                this.userList = response['users'];
                this.userList.forEach(user => {
                    user.createdDate = moment(user.createdDate).format('DD-MM-YYYY');
                    user.updatedDate = moment(user.updatedDate).format('DD-MM-YYYY');
                })
            }   
        })
    }

    editData(data = {}) {
        this.isEdited = true;
        this.userData = JSON.parse(JSON.stringify(data));
    }

    cancel() {
        this.getUserList();
        this.isEdited = false;
    }
}