import { NgModule } from '@angular/core';
import { Routes, Router, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth.guard';
import { HeaderComponent } from './main/header/header.component';
import { FooterComponent } from './main/footer/footer.component';
import { PanelComponent } from './main/panel/panel.component';
import { LogoutComponent } from './logout/logout.component';
import {CategoriesComponent} from './main/panel/categories/categories-list.component';
import {SubcategoriesComponent} from './main/panel/categories/subcategories/subcategories-list.component';
import { ServicecatalogComponent } from './main/panel/servicecatalog/servicecatalog.component';
import {OfferComponent} from './main/panel/offer/offer.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', canActivate: [AuthGuard] , component: MainComponent },
  { path: 'panel', canActivate: [AuthGuard] , component: PanelComponent },
  { path: 'categories', canActivate: [AuthGuard], component: CategoriesComponent},
  { path: 'categories/:id', canActivate: [AuthGuard], component: SubcategoriesComponent},
  { path: 'catalog', canActivate: [AuthGuard], component: ServicecatalogComponent},
  { path: 'catalog/:id', canActivate: [AuthGuard], component: ServicecatalogComponent},
  { path: 'offer', canActivate: [AuthGuard], component: OfferComponent},
  { path: 'offer/:id', canActivate: [AuthGuard], component: OfferComponent},
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent},
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})

export class AppRoutingModule {

}
