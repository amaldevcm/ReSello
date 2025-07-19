import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonService } from "src/app/app-common/common.service";

@Component({
    selector: 'app-login',
    templateUrl: "./login.component.html"
})

export class LoginComponent {
    loginForm: FormGroup
    data = {
        email: null,
        password: null
    }

    constructor(private common: CommonService, private router: Router) {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(8)])
        });
    }

    clearForm() {
        this.loginForm.reset();
        this.data = {
            email: null,
            password: null
        }
    }

    login() {
        const baseurl = window.location.host;
        if(!this.loginForm.valid) {
            console.log('Error in form');
        } else {
            this.common.post('users/login', this.data).subscribe(result => {
                if(result && result['error'] == null) {
                    localStorage.setItem('session-token', result['token']);
                    this.common.setUserData(result['user']);
                    this.common.isLoggedIn = true;
                    this.router.navigate(['']);
                } else {
                    console.log('Error');
                }
                this.clearForm();
            })
        }
    }
}