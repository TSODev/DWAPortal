import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';


import { CommonService } from '../../shared/services/common.service';
import { BackendDatastoreService } from '../../shared/services/backend-datastore.service';
import {Service} from '../../shared/models/service.model';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  services: Service[] = [];
  servicesInCatalog: string[];

  	constructor(private common: CommonService,
                private backend: BackendDatastoreService
                ) { }

  	ngOnInit() {

      console.log('Panel', Date().toString());
      this.services = this.common.FullCatalog;

  	}

    ngDoCheck() {
      console.log('Panel - ngDoCheck > ', this.servicesInCatalog);
      this.servicesInCatalog = this.common.CustomizedServiceCatalog;
    }


  onServiceSelected(service: Service) {
//    this.router.navigate(['/service/' + service.id]);
    }

}