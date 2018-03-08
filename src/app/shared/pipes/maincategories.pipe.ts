import { Pipe, PipeTransform } from '@angular/core';

import { Category } from '../models/category.model';

@Pipe({
  name: 'maincategory',
  pure: false
})

export class MainCategoryFilterPipe implements PipeTransform {

  transform(items: Category[]): Category[] {
    return items.filter(item => item.parentId === null);
  }
}
