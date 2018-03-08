import { Component, OnInit } from '@angular/core';

import { CommonService } from '../../../shared/services/common.service';
import { BackendDatastoreService } from '../../../shared/services/backend-datastore.service';

import { Category } from '../../../shared/models/category.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css'],
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];
  showDetails: boolean[];

  constructor(
                private router: Router,
  				      private common: CommonService,
                private backend: BackendDatastoreService
             ) { }

  ngOnInit() {
    console.log('CategoriesComponent', Date().toString());
    const service_url = new URL(this.common.getURL());

    this.backend.getCategories(service_url)
  			.subscribe(
  				(data: Category[]) => {
  					console.log('Get ' + data.length + ' categories');
  					this.categories = data;

  				},
  				(error) => {
  					console.log('Login ', error);
  				});

    // Initialise to false the flag that is use to show the CategoriesComponent Details.
    for (let i = 0 ; i < this.categories.length ; i++){
        this.showDetails[i]= false;
    }
  }

  toggle_details(id) {
    this.showDetails[id] = !this.showDetails[id];

  }

  getFullList(): Category[] {
    return this.categories;
  }

  onClickCategory(id: string) {
    this.router.navigate(['/categories/' + id]);
  }

  onCategorySelected(category: Category, catalog: boolean) {
    this.router.navigate(['/categories/' + category.id]);
  }

}
