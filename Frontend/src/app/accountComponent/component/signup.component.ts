import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonService } from "src/app/app-common/common.service";

@Component({
    selector: 'app-signup',
    templateUrl: "./signup.component.html",
})

export class SignupComponent {
    signupForm: FormGroup;
    data = {
        name: null,
        email: null,
        password: null,
        re_pass: null
    }
    constructor(private common: CommonService, private router: Router) {
        this.signupForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(8)]),
            re_pass: new FormControl('', [Validators.required, Validators.minLength(8)])
        });
    }

    clearForm() {
        this.signupForm.reset();
        this.data = {
            name: null,
            email: null,
            password: null,
            re_pass: null
        }
    }
    
    signUp() {
        const baseurl = window.location.host;
        console.log(this.signupForm.valid);
        if(!this.signupForm.valid) {
            console.log('Error in form');
        } else {
            delete this.data.re_pass;
            this.common.post('users/register', this.data).subscribe(result => {
                if(result && result['error'] === null) {
                    localStorage.setItem('session-token', result['token']);
                    this.common.updateUserData(result['user']);
                    this.common.isLoggedIn = true;
                    this.router.navigate(['']);
                } else {
                    console.log('Error');
                }
                this.clearForm();
            });
        }
    }
}