import { Component, OnInit } from '@angular/core';

import { CommonService } from '../../shared/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	AppName = '';

  constructor(private common: CommonService) { }

  ngOnInit() {
  	this.AppName = this.common.getTitle();
  }

}
