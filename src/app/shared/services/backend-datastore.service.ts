import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { Category } from '../models/category.model';
import { Service } from '../models/service.model';
import { ServiceOffer } from '../models/serviceoffer.model';
import { Request } from '../models/request.model';


@Injectable()
export class BackendDatastoreService {

  proxyURL = 'http://localhost:3000/api';

  url = '';

  constructor(private http: HttpClient) { }

  getVersion(): Observable<string> {
    return this.http.get( this.proxyURL + '/version',{responseType: 'text'});
  }


  getToken(urlbase: URL, username:string, password: string): Observable<string> {
    const protocol = urlbase.protocol;
    const port = urlbase.port;
    const server = urlbase.hostname;

    return this.http.post('http://localhost:3000/api/config', {
                                                                    protocol,
                                                                    port,
                                                                    server,
                                                                    adminuser: username,
                                                                    adminpwd: password
                                                                    } , {
//                                                                              withCredentials: true,
                                                                              responseType: 'text'
                                                                          });
  }

  getCategories(urlbase: URL): Observable<Category[]> {                // Observable should be CatalogEntry[] Type
    return this.http.get(this.proxyURL + '/categories', {
                                                                    reportProgress: true,
                                                                      responseType: 'json'
                                                                })
      .map(data => <Category[]>data['categories']);
  }

  getChildOfCategories(urlbase: URL, categoryId: string): Observable<Category[]> {                // Observable should be CatalogEntry[] Type
    return this.http.get(this.proxyURL + '/categories/' + categoryId, {
      reportProgress: true,
      responseType: 'json'
    })
      .map(data => <Category[]>data);
  }

  getFullServiceCatalog(): Observable<Service[]> {
     return this.http.post(this.proxyURL + '/services',
       {},
       {
         reportProgress: true,
         responseType: 'json'
       })
     .map(data => <Service[]>data['services']);
    }

  getServiceCatalogByCategory(categoryId: string): Observable<Service[]> {
    return this.http.post(this.proxyURL + '/services',
      {
        categoryId: categoryId
      },
      {
        responseType: 'json',
        reportProgress: true
      })
    .map(data => <Service[]>data['services']);
  }

  getServiceOfferingDetails(serviceId: string): Observable<ServiceOffer> {
    return this.http.get(this.proxyURL + '/offer/' + serviceId ,
      {
        reportProgress: true,
        responseType: 'json'
      })
      .map(data => <ServiceOffer>data);
  }

  initializeServiceRequest(serviceId: string): Observable<Request> {
    return this.http.post(this.proxyURL + '/services/' + serviceId + '/request',
  {},
  {
    reportProgress: true,
    responseType: 'json'
  })
  .map(data => <Request>data);
  }

  getIconbyUrl(iconurl: string): Observable<string> {
    return this.http.post(this.proxyURL + '/icon',
      {
        iconurl: iconurl
      },
      {
        reportProgress: true,
        responseType: 'text'
      })
    .map(data => data);
  }
}

