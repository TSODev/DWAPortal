import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonService} from '../shared/services/common.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private common: CommonService) { }

  ngOnInit() {
  	this.common.setAuthenticated(false);
  	this.router.navigate(['/login']);
  }

}
