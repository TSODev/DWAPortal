import { Category } from './category.model';
import {Price} from './price.model';
import {ProvisioningTime} from './provisiontime.model';


export class Service {
  constructor(
      public serviceType: string,
      public templateType: string,
      public id: string,
      public name: string,
      public excerpt: string,
      public iconUrl: string,
      public rating: number,
      public modifiedDate: string,
      public createdDate: string,
      public ratingCount: number,
      public categories: Category[],
      public price: Price,
      public onceCost: number,
      public monthlyCost: number,
      public yearlyCost: number,
      public provisioningTime: ProvisioningTime,
      public bundledServices: Service[],
      public entitled: boolean
  ) {}
}
