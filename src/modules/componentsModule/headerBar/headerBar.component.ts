import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-bar',
  templateUrl: './headerBar.component.html',
  styleUrls: ['./headerBar.component.scss'],
})
export class HeaderBarComponent implements OnInit {

  @Input()
  public title: string;

  constructor() { }

  ngOnInit() {
  }

}
