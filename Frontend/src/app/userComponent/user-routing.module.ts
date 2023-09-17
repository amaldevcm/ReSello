import { RouterModule, Routes } from "@angular/router";
import { UserComponent } from "./component/user.component";
import { UserCreateComponent } from "./component/user-create.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    { path: '', component: UserComponent },
    { path: 'create', component: UserCreateComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserRoutingModule { }