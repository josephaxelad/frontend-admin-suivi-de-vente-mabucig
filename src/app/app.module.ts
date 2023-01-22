import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './components/partials/sidenav/sidenav.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { AlertComponent } from './components/partials/alert/alert.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { PageHeaderComponent } from './components/partials/page-header/page-header.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdministratorsComponent } from './components/administrators/administrators.component';
import { ProductsComponent } from './components/products/products.component';
import { SalesComponent } from './components/sales/sales.component';
import { LoginComponent } from './components/login/login.component';
import { WholesalersComponent } from './components/wholesalers/wholesalers.component';
import { CitiesComponent } from './components/cities/cities.component';
import { SemiWholesalersComponent } from './components/semi-wholesalers/semi-wholesalers.component';
import { GroupsComponent } from './components/groups/groups.component';
import { BrandsComponent } from './components/brands/brands.component';
import { DistributionAgenciesComponent } from './components/distribution-agencies/distribution-agencies.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NewCityComponent } from './components/cities/new-city/new-city.component';
import { EditCityComponent } from './components/cities/edit-city/edit-city.component';
import { AllCitiesComponent } from './components/cities/all-cities/all-cities.component';
import { NewDistributionAgencyComponent } from './components/distribution-agencies/new-distribution-agency/new-distribution-agency.component';
import { AllDistributionAgenciesComponent } from './components/distribution-agencies/all-distribution-agencies/all-distribution-agencies.component';
import { EditDistributionAgencyComponent } from './components/distribution-agencies/edit-distribution-agency/edit-distribution-agency.component';
import { NewBrandComponent } from './components/brands/new-brand/new-brand.component';
import { EditBrandComponent } from './components/brands/edit-brand/edit-brand.component';
import { AllBrandsComponent } from './components/brands/all-brands/all-brands.component';
import { NewProductComponent } from './components/products/new-product/new-product.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { AllProductsComponent } from './components/products/all-products/all-products.component';
import { SingleProductComponent } from './components/products/single-product/single-product.component';
import { NewGroupComponent } from './components/groups/new-group/new-group.component';
import { EditGroupComponent } from './components/groups/edit-group/edit-group.component';
import { AllGroupsComponent } from './components/groups/all-groups/all-groups.component';
import { NewAdminComponent } from './components/administrators/new-admin/new-admin.component';
import { EditAdminComponent } from './components/administrators/edit-admin/edit-admin.component';
import { AllAdminsComponent } from './components/administrators/all-admins/all-admins.component';
import { SingleAdminComponent } from './components/administrators/single-admin/single-admin.component';
import { EditUserAdminComponent } from './components/administrators/edit-user-admin/edit-user-admin.component';
import { EditPasswordAdminComponent } from './components/administrators/edit-password-admin/edit-password-admin.component';
import { NewWholesalerComponent } from './components/wholesalers/new-wholesaler/new-wholesaler.component';
import { EditWholesalerComponent } from './components/wholesalers/edit-wholesaler/edit-wholesaler.component';
import { AllWholesalersComponent } from './components/wholesalers/all-wholesalers/all-wholesalers.component';
import { SingleWholesalerComponent } from './components/wholesalers/single-wholesaler/single-wholesaler.component';
import { NewSemiWholesalerComponent } from './components/semi-wholesalers/new-semi-wholesaler/new-semi-wholesaler.component';
import { EditSemiWholesalerComponent } from './components/semi-wholesalers/edit-semi-wholesaler/edit-semi-wholesaler.component';
import { AllSemiWholesalersComponent } from './components/semi-wholesalers/all-semi-wholesalers/all-semi-wholesalers.component';
import { SingleSemiWholesalerComponent } from './components/semi-wholesalers/single-semi-wholesaler/single-semi-wholesaler.component';
import { AllSalesComponent } from './components/sales/all-sales/all-sales.component';
import { SingleSaleComponent } from './components/sales/single-sale/single-sale.component';
import { CodeQrComponent } from './components/code-qr/code-qr.component';
import { AllCodesQrComponent } from './components/code-qr/all-codes-qr/all-codes-qr.component';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';


@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HeaderComponent,
    AlertComponent,
    FooterComponent,
    PageHeaderComponent,
    NotFoundComponent,
    DashboardComponent,
    AdministratorsComponent,
    ProductsComponent,
    SalesComponent,
    LoginComponent,
    WholesalersComponent,
    CitiesComponent,
    SemiWholesalersComponent,
    GroupsComponent,
    BrandsComponent,
    DistributionAgenciesComponent,
    NewCityComponent,
    EditCityComponent,
    AllCitiesComponent,
    NewDistributionAgencyComponent,
    AllDistributionAgenciesComponent,
    EditDistributionAgencyComponent,
    NewBrandComponent,
    EditBrandComponent,
    AllBrandsComponent,
    NewProductComponent,
    EditProductComponent,
    AllProductsComponent,
    SingleProductComponent,
    NewGroupComponent,
    EditGroupComponent,
    AllGroupsComponent,
    NewAdminComponent,
    EditAdminComponent,
    AllAdminsComponent,
    SingleAdminComponent,
    EditUserAdminComponent,
    EditPasswordAdminComponent,
    NewWholesalerComponent,
    EditWholesalerComponent,
    AllWholesalersComponent,
    SingleWholesalerComponent,
    NewSemiWholesalerComponent,
    EditSemiWholesalerComponent,
    AllSemiWholesalersComponent,
    SingleSemiWholesalerComponent,
    AllSalesComponent,
    SingleSaleComponent,
    CodeQrComponent,
    AllCodesQrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,


    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
 }
