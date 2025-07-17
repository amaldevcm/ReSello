import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { CommonService } from "src/app/app-common/common.service";

@Component({
    selector: 'app-item',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit{
    userList = [];
    isEdited = false;
    userData = {}

    constructor(private http: HttpClient, private common: CommonService) { }
    ngOnInit(): void {
        this.getUserList();
    }

    getUserList() {
        this.common.get('users').subscribe(response => {
            // console.log("user list", response);
            if(response && response !== undefined) {
                this.userList = response['users'];
                this.userList.forEach(user => {
                    user.createdDate = user.createdDate? moment(user.createdDate).format('DD-MM-YYYY'): null;
                    user.updatedDate = user.updatedDate? moment(user.updatedDate).format('DD-MM-YYYY'): null;
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