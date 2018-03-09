import { Component, OnInit, Input } from '@angular/core';

import { Service } from '../../../../shared/models/service.model';
import { BackendDatastoreService } from '../../../../shared/services/backend-datastore.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Request } from '../../../../shared/models/request.model';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  @Input() service: Service;
  request: Request;
  requestIsDefined = false;

  constructor(
      private backend: BackendDatastoreService,
      private router: Router,
      private route: ActivatedRoute,
      private common: CommonModule
  ) {   }

  ngOnInit() {
    const serviceid = this.route.snapshot.params['id'];
    console.log('Requesting Service : ', serviceid);

 //   if (this.serviceOffer.bundledServices.length === 0) {
      this.backend.initializeServiceRequest(serviceid)
        .subscribe(
          (data: Request) => {
            this.request = data;
            this.requestIsDefined = true;
            console.log('Request :', this.request);
          },
          (error) => {
            console.log('Request: ', error);
          });
  // }
  }

}
