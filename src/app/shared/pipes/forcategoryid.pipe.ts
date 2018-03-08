import { Pipe, PipeTransform } from '@angular/core';
import {Service} from '../models/service.model';

@Pipe({
  name: 'forcategoryid'
})
export class CategoryPipe implements PipeTransform {


  transform(items: Service[], forcategoryid: string): Service[] {

    console.log('Filtering : ', forcategoryid);

    if (forcategoryid.length > 0) {
      return items.filter(
        item => {
          return this.itemIsInCategoryId(item, forcategoryid);
        }
      );
    } else {
      console.log(' without filter ');
      return items;
    }
  };

    private itemIsInCategoryId(service: Service , id: string): boolean {

      if (service.categories.length !== 0) {
        console.log(service.categories);
        for (let i = 0 ; i < service.categories.length ; i++) {
          if (service.categories[i].id === id) {
            return true;
          }
        }
        return false;
      } else {
        return false;
}
}
}
