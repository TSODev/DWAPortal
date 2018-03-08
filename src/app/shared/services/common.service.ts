import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Service} from '../models/service.model';


@Injectable()
export class CommonService {

  title = "DWAPortal";

  url = '';
  username = '';
  password = '';

  FullCatalog: Service[];
  CustomizedServiceCatalog = [];

	isAuthenticated = false;
	loading = true;

  constructor() { }

  getTitle(): string {
    return this.title;
  }

  setAuthenticated(state: boolean) {
  	this.isAuthenticated = state;
  }

  getAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  setURL(url: string) {
    this.url = url;
  }

  getURL(): string {
    return this.url;
  }

  setUserName(username: string) {
    this.username = username;
  }

  getUserName(): string {
    return this.username;
  }

  setPWD(password: string) {
    this.password = password;
  }

  getPWD(): string {
    return this.password;
  }

  pinInCatalog(id) {
    this.CustomizedServiceCatalog.push(id);
  }

  unpinFromCatalog(id) {
    const index = this.CustomizedServiceCatalog.indexOf(id);

    if (index !== -1) {
      this.CustomizedServiceCatalog.splice(index, 1 );
    }
  }

  getLoadingStatus() {
    return this.loading;
  }

  setLoadingStatus(status: boolean) {
    this.loading = status;
  }

  logout() {
    this.isAuthenticated = false;
  }

}
