import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/do';


@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do(
    	event => {
    		console.log("Response Interceptor : ", event);
    	});
  }
}