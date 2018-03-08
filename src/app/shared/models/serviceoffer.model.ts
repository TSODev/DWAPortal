import { Category } from './category.model';
import { Service } from './service.model';
import {Price} from './price.model';
import {ProvisioningTime} from './provisiontime.model';
import {DynamicField} from './dynamicfield.model';
import {Media} from './media.model';
import {Quantity} from './quantity.model';


export class ServiceOffer {
  constructor(
    public id: string,
    public modifiedDate: string,
    public name: string,
    public available: boolean,
    public description: string,
    public excerpt: string,
    public iconUrl : string,
    public rating: number,
    public createdDate: string,
    public ratingCount: number,
    public categories: Category[],
    public price: Price,
    public onceCost: number,
    public monthlyCost: number,
    public yearlyCost: number,
    public provisioningTime: ProvisioningTime,
    public dynamicFields: DynamicField[],
    public serviceType: string,
    public externalWorkflow: string,
    public templateType: string,
    public bundledServices: Service[],
    public entitled: boolean,
    public fulfillmentType: string,
    public media: Media[],
    public quantity: Quantity,
    public restrictedFullCatalogView: boolean,
    public useBundledServicesCosts: boolean,
    public score: number,
    public unavailableRequiredServicesCount: number,
    public calculatedAvailability:boolean
  ) { }
}
