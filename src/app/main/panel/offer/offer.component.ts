import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BackendDatastoreService} from '../../../shared/services/backend-datastore.service';
import {CommonService} from '../../../shared/services/common.service';
import {ServiceOffer} from '../../../shared/models/serviceoffer.model';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})

export class OfferComponent implements OnInit {

  serviceOffer: ServiceOffer;

  tabdetails = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private common: CommonService,
    private backend: BackendDatastoreService
  ) { }

  ngOnInit() {

    const service_url = new URL(this.common.getURL());
    const id = this.route.snapshot.params['id'];
    console.log('id :', id);

    this.backend.getServiceOfferingDetails(id)
      .subscribe(
        (data: ServiceOffer) => {
          this.serviceOffer = data;
          console.log('Service Offer : ', this.serviceOffer);

        },
        (error) => {
          console.log('Login ', error);
        });
  }

  toggletabdetails(){
    this.tabdetails = !this.tabdetails;
  }

  showtabdetails(){
    this.tabdetails = true;
  }

  showtabratings() {
    this.tabdetails = false;
  }
}

