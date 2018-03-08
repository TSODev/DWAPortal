import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { CommonService } from '../../../shared/services/common.service';
import { BackendDatastoreService } from '../../../shared/services/backend-datastore.service';

import { Service } from '../../../shared/models/service.model';
import {isDefined} from '@angular/compiler/src/util';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-servicecatalog',
  templateUrl: './servicecatalog.component.html',
  styleUrls: ['./servicecatalog.component.css']
})
export class ServicecatalogComponent implements OnInit {

  services: Service[] = [];
  servicesInCatalog: string[];
  id = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private common: CommonService,
    private backend: BackendDatastoreService
  ) { }

  ngOnInit() {
    console.log('CatalogComponent', Date().toString());
       this.id = this.route.snapshot.params['id'] || '';
       console.log('id :', this.id);

      this.services = this.common.FullCatalog;
  }

  ngDoCheck() {
    console.log('Service Catalog - ngDoCheck > ', this.servicesInCatalog);
    this.servicesInCatalog = this.common.CustomizedServiceCatalog;
  }

  onServiceSelected(service: Service) {
//    this.router.navigate(['/service/' + service.id]);
  }

}
