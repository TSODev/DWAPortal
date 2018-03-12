import { Component, OnInit, Input } from '@angular/core';

import { Service } from '../../../../shared/models/service.model';
import { BackendDatastoreService } from '../../../../shared/services/backend-datastore.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Request } from '../../../../shared/models/request.model';
import { Page } from '../../../../shared/models/questionpage.model';
import { PageItem } from '../../../../shared/models/questionpageitem.model';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  @Input() service: Service;
  request: Request;
  requestIsDefined = false;


  pages: Page[];
  pageItems: PageItem[][];

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

            // Manage multiple page questionnaire
            // Create a structure of question for x pages
            
            for ( let p = 0 ; p < this.request.questionnaire.pages.length ; p++) {
                const a_page: Page = this.request.questionnaire.pages[p];
                this.pages.push(a_page);
                for (let i = 0 ; i < a_page.pageItems.length ; i++) {
                  const an_item: PageItem = a_page.pageItems[i];
                  this.pageItems[p].push(an_item);
                }
            }
            console.log('Pages : ', this.pages);
            console.log('PageItems : ', this.pageItems);
          },
          (error) => {
            console.log('Request: ', error);
          });
  // }
  }

}
