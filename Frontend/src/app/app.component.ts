import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as feather from 'feather-icons';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'frontend';

  ngOnInit(): void {
    feather.replace();
  }

  ngAfterViewInit(): void {
    feather.replace();
  }
}
