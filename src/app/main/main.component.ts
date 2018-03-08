import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonService } from '../shared/services/common.service';
import {BackendDatastoreService} from '../shared/services/backend-datastore.service';
import { Service } from '../shared/models/service.model';
import {Subscription} from 'rxjs/Subscription';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  loading = this.common.getLoadingStatus();

  constructor(private common: CommonService,
              private router: Router,
              private backend: BackendDatastoreService) { }

  ngOnInit() {
    this.backend.getFullServiceCatalog().subscribe(
      (data: Service[]) => {
        this.common.FullCatalog = data;
        // this.common.setLoadingStatus(false);
        // this.loading = false;
        this.endOfInit();
        console.log('Catalog : ', this.common.FullCatalog);
      },
      (error) => {
        console.log('error');
      }
    );
  }

  endOfInit() {
    this.common.setLoadingStatus(false);
    this.loading = false;
  }

  onLogout(){
  	console.log('Going out of the app !')
  	this.common.logout();
  	this.router.navigate(['/login']);
  }

}
