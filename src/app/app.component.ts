import { Component, OnInit } from '@angular/core';

import { CommonService } from './shared/services/common.service';
import {BackendDatastoreService} from './shared/services/backend-datastore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    //	isAuthenticated: boolean = false;

  constructor(private common: CommonService,
              private backend: BackendDatastoreService
              ) {
  	}

  	ngOnInit() {
      this.backend.getVersion().subscribe(
        (data: string) => console.log('APIProxy version = ', data)
      );

  	}

}



