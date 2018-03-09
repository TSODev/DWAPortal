import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BackendDatastoreService} from '../../../shared/services/backend-datastore.service';
import {CommonService} from '../../../shared/services/common.service';
import {ServiceOffer} from '../../../shared/models/serviceoffer.model';
import { Request } from '../../../shared/models/request.model';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})

export class OfferComponent implements OnInit {

  serviceOffer: ServiceOffer; 
  request: Request;
  serviceIsDefined = false;
  requestIsDefined = false;
  tabdetails = true;
  activetab1 = 'active';
  activetab2 = '';

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
          this.serviceIsDefined = true;
          console.log('Service Offer : ', this.serviceOffer);
        },
        (error) => {
          console.log('Service Offer :  ', error);
        });
  }

  toggletabdetails() {
    this.tabdetails = !this.tabdetails;
    if (this.activetab1 === '') { this.activetab1 = 'active'; } else { this.activetab1 = ''; }
    if (this.activetab2 === '') { this.activetab2 = 'active'; } else { this.activetab2 = ''; }
  }

  showtabdetails() {
    this.tabdetails = true;
  }

  showtabratings() {
    this.tabdetails = false;
  }

  // Attention : il faut traiter le cas ou l'offre est un bundle.
  onRequestClicked() {
    this.router.navigate(['/request/' + this.serviceOffer.id]);
    // if (this.serviceOffer.bundledServices.length === 0) {
    //   console.log('Initialize Service Request', this.serviceOffer.id);
    //   this.backend.initializeServiceRequest(this.serviceOffer.id)
    //     .subscribe(
    //       (data: Request) => {
    //         this.request = data;
    //         this.requestIsDefined = true;
    //         console.log('Request :', this.request);
    //         this.router.navigate(['/request/' + data.requestId]);
    //       },
    //       (error) => {
    //         console.log('Request: ', error);
    //       });
//    }
 
  }

}

