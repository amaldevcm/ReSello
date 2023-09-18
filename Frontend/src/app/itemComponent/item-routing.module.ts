import { RouterModule, Routes } from "@angular/router";
import { ItemsComponent } from "./component/item.component";
import { NgModule } from "@angular/core";
import { ItemCreateComponent } from "./component/item-create.component";

const routes: Routes = [
    { path: '', component: ItemsComponent },
    { path: 'create', component: ItemCreateComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ItemRoutingModule {}