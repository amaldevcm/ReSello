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

  constructor(public common: CommonService) {
    this.isLoggedIn = common.isLoggedIn;
  }

  ngOnInit(): void {
    console.log(this.isLoggedIn)
    this.common.user$.subscribe(user => {
      if(user) {
        this.userName = user.name;
      }
    });
  }
}
