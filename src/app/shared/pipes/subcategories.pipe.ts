import { Pipe, PipeTransform } from '@angular/core';

import { Category } from '../models/category.model';

@Pipe({
  name: 'maincategory',
  pure: false
})

export class SubCategoryFilterPipe implements PipeTransform {

  transform(items: Category[], id: string): Category[] {
    return items.filter(item => item.parentId != null && item.parentId === id);
  }
}
