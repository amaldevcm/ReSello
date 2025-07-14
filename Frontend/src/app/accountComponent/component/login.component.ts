import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
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

    constructor(private common: CommonService) {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(8)])
        });
    }

    login() {
    }
}