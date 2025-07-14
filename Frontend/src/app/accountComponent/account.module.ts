import { NgModule } from "@angular/core";
import { LoginComponent } from "./component/login.component";
import { SignupComponent } from "./component/signup.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppCommonModule } from "../app-common/common.module";
import { AccountRoutingModule } from "./account-routing.module";
import { CommonService } from "../app-common/common.service";

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        AccountRoutingModule,
        ReactiveFormsModule,
        AppCommonModule
    ],
    providers: [CommonService],
    exports: []
})

export class AccountModule { };