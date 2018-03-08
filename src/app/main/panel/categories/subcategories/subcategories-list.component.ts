import { Component, OnInit } from '@angular/core';
import { Category} from '../../../../shared/models/category.model';
import {BackendDatastoreService} from '../../../../shared/services/backend-datastore.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../../shared/services/common.service';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories-list.component.html',
  styleUrls: ['./subcategories-list.component.css']
})
export class SubcategoriesComponent implements OnInit {

  categories: Category[] = [];
  subcategory: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private common: CommonService,
    private backend: BackendDatastoreService
  ) { }

  ngOnInit() {
    console.log('SubCategoriesComponent', Date().toString());
    const service_url = new URL(this.common.getURL());
    const id = this.route.snapshot.params['id'];
    console.log('id :', id);


    this.backend.getChildOfCategories(service_url, id)
      .subscribe(
        (data: Category[]) => {
          console.log('Get ' + data.length + ' categories');
          this.categories = data;

        },
        (error) => {
          console.log('Login ', error);
        });
  }


  onClickCategory(id: string) {
    this.router.navigate(['/catalog/' + id]);
  }
  onCategorySelected(category: Category) {
    this.router.navigate(['/catalog/' + category.id]);
  }

}
