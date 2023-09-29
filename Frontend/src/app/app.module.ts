import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CommonService } from './common.service';
import { HttpClientModule } from '@angular/common/http' 
import { CommonModule } from '@angular/common';
import { AppCommonModule } from './app-common/common.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AppCommonModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
