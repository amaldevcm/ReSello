import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'item', loadChildren: () => import('../app/itemComponent/item.module').then(m => m.ItemModule) },
  { path: 'user', loadChildren: () => import('../app/userComponent/user.module').then(m => m.UserModule) },
  { path: 'account', loadChildren: () => import('./accountComponent/account.module').then(m => m.AccountModule)},
  { path: '', loadChildren: () => import('../app/homeComponent/home.module').then(m => m.HomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
