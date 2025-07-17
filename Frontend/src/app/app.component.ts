import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonService } from './app-common/common.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ReSello';

  isLoggedIn: Boolean = false;
  userName:String = null;
  constructor(common: CommonService) { 
    this.isLoggedIn = common.isLoggedIn;
    this.userName = common.user.name;
  }

  ngOnInit(): void {
  }
}
