import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

//import { HttpModule } from '@angular/http';
import { HttpClientModule,  HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RatingModule } from 'ng2-rating';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { CommonService } from './shared/services/common.service';
import { BackendDatastoreService } from './shared/services/backend-datastore.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth.guard';
import { HeaderComponent } from './main/header/header.component';
import { FooterComponent } from './main/footer/footer.component';
import { PanelComponent } from './main/panel/panel.component';
import { LogoutComponent } from './logout/logout.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { CollapseDirective } from './shared/directives/collapse.directive';
import { CategoriesComponent } from './main/panel/categories/categories-list.component';
import {OrderByPipe} from './shared/pipes/orderby.pipe';
import {MainCategoryFilterPipe} from './shared/pipes/maincategories.pipe';
import { SubcategoriesComponent } from './main/panel/categories/subcategories/subcategories-list.component';
import { ServicecatalogComponent } from './main/panel/servicecatalog/servicecatalog.component';
import { CategoryComponent } from './main/panel/categories/category/category-item.component';
import { ServiceofferComponent } from './main/panel/servicecatalog/serviceoffer/serviceoffer.component';

import { LoadingComponent } from './main/panel/loading/loading.component';
import { CustomlistPipe } from './shared/pipes/customlist.pipe';
import { CategoryPipe } from './shared/pipes/forcategoryid.pipe';
import { OfferComponent } from './main/panel/offer/offer.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    PanelComponent,
    LogoutComponent,
    DropdownDirective,
    CollapseDirective,
    CategoriesComponent,
    OrderByPipe,
    MainCategoryFilterPipe,
    SubcategoriesComponent,
    ServicecatalogComponent,
    CategoryComponent,
    ServiceofferComponent,
    LoadingComponent,
    CustomlistPipe,
    CategoryPipe,
    OfferComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RatingModule,

  ],
  providers: [
  	CommonService,
  	BackendDatastoreService,
    AuthGuard,
  	HttpClientModule,
    CookieService,
    CategoriesComponent
//        { provide: HTTP_INTERCEPTORS, useClass: MyHttpLogInterceptor, multi: true },
//        { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
