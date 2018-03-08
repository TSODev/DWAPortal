import { Pipe, PipeTransform } from '@angular/core';
import { Service } from '../models/service.model';

@Pipe({
  name: 'customlist'
})
export class CustomlistPipe implements PipeTransform {

  // transform(value: any, args?: any): any {
  //   return null;
  // }

  transform(items: Service[], ids: string[]): Service[] {

    console.log('Filtering : ', ids);

    if (ids.length > 0) {
      return items.filter(
        item => ids.indexOf(item.id) != -1
      );
    } else {
      console.log('Nothing to filter !');
      return null;
    }

}

}
