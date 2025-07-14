import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
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
    constructor(private common: CommonService) {
        this.signupForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(8)]),
            re_pass: new FormControl('', [Validators.required, Validators.minLength(8)])
        });
    }
    
    signUp() {
        return
    }
}