import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Service } from '../../../../shared/models/service.model';
import {CommonService} from '../../../../shared/services/common.service';
import {BackendDatastoreService} from '../../../../shared/services/backend-datastore.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-serviceoffer',
  templateUrl: './serviceoffer.component.html',
  styleUrls: ['./serviceoffer.component.css']
})
export class ServiceofferComponent implements OnInit {

	@Input() service: Service;
	@Output() serviceSelected = new EventEmitter<void>();

	iconPath = '';
	pinned = false;
	pinstyle = ['glyphicon', 'glyphicon-pushpin'];

	constructor(private common: CommonService,
              private backend: BackendDatastoreService,
              private router: Router
              ) { }

  ngOnInit() {
	  // this.backend.getIconbyUrl(this.service.iconUrl).subscribe(
      // ( data => { this.iconPath = data; } );
	  // console.log(this.iconPath);
  }

  onSelected() {
  	this.serviceSelected.emit();
  }

  onPinSelected(service) {
    this.pinned = !this.pinned;
    console.log('Pin Clicked', service, ' : ', this.pinned);
    if (!this.pinned){
      this.pinstyle = ['glyphicon', 'glyphicon-pushpin'];
      this.common.unpinFromCatalog(service.id);
    } else {
      this.pinstyle = ['glyphicon', 'glyphicon-thumbs-up'];
      this.common.pinInCatalog(service.id);
    }
  }

  onClickOpen(service) {
	  console.log('Open Clicked');
    this.router.navigate(['/offer/' + service.id]);
  }

  onPin(service){
	  console.log('Pin', service.name);
  }
}




