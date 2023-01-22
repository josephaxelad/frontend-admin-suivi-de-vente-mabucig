import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministratorsComponent } from './components/administrators/administrators.component';
import { AllAdminsComponent } from './components/administrators/all-admins/all-admins.component';
import { EditAdminComponent } from './components/administrators/edit-admin/edit-admin.component';
import { EditPasswordAdminComponent } from './components/administrators/edit-password-admin/edit-password-admin.component';
import { EditUserAdminComponent } from './components/administrators/edit-user-admin/edit-user-admin.component';
import { NewAdminComponent } from './components/administrators/new-admin/new-admin.component';
import { SingleAdminComponent } from './components/administrators/single-admin/single-admin.component';
import { AllBrandsComponent } from './components/brands/all-brands/all-brands.component';
import { BrandsComponent } from './components/brands/brands.component';
import { EditBrandComponent } from './components/brands/edit-brand/edit-brand.component';
import { NewBrandComponent } from './components/brands/new-brand/new-brand.component';
import { AllCitiesComponent } from './components/cities/all-cities/all-cities.component';
import { CitiesComponent } from './components/cities/cities.component';
import { EditCityComponent } from './components/cities/edit-city/edit-city.component';
import { NewCityComponent } from './components/cities/new-city/new-city.component';
import { AllCodesQrComponent } from './components/code-qr/all-codes-qr/all-codes-qr.component';
import { CodeQrComponent } from './components/code-qr/code-qr.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AllDistributionAgenciesComponent } from './components/distribution-agencies/all-distribution-agencies/all-distribution-agencies.component';
import { DistributionAgenciesComponent } from './components/distribution-agencies/distribution-agencies.component';
import { EditDistributionAgencyComponent } from './components/distribution-agencies/edit-distribution-agency/edit-distribution-agency.component';
import { NewDistributionAgencyComponent } from './components/distribution-agencies/new-distribution-agency/new-distribution-agency.component';
import { AllGroupsComponent } from './components/groups/all-groups/all-groups.component';
import { EditGroupComponent } from './components/groups/edit-group/edit-group.component';
import { GroupsComponent } from './components/groups/groups.component';
import { NewGroupComponent } from './components/groups/new-group/new-group.component';
import { LoginComponent } from './components/login/login.component';
import { AllProductsComponent } from './components/products/all-products/all-products.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { NewProductComponent } from './components/products/new-product/new-product.component';
import { ProductsComponent } from './components/products/products.component';
import { SingleProductComponent } from './components/products/single-product/single-product.component';
import { AllSalesComponent } from './components/sales/all-sales/all-sales.component';
import { SalesComponent } from './components/sales/sales.component';
import { SingleSaleComponent } from './components/sales/single-sale/single-sale.component';
import { AllSemiWholesalersComponent } from './components/semi-wholesalers/all-semi-wholesalers/all-semi-wholesalers.component';
import { EditSemiWholesalerComponent } from './components/semi-wholesalers/edit-semi-wholesaler/edit-semi-wholesaler.component';
import { NewSemiWholesalerComponent } from './components/semi-wholesalers/new-semi-wholesaler/new-semi-wholesaler.component';
import { SemiWholesalersComponent } from './components/semi-wholesalers/semi-wholesalers.component';
import { SingleSemiWholesalerComponent } from './components/semi-wholesalers/single-semi-wholesaler/single-semi-wholesaler.component';
import { AllWholesalersComponent } from './components/wholesalers/all-wholesalers/all-wholesalers.component';
import { EditWholesalerComponent } from './components/wholesalers/edit-wholesaler/edit-wholesaler.component';
import { NewWholesalerComponent } from './components/wholesalers/new-wholesaler/new-wholesaler.component';
import { SingleWholesalerComponent } from './components/wholesalers/single-wholesaler/single-wholesaler.component';
import { WholesalersComponent } from './components/wholesalers/wholesalers.component';
import { AuthGuard } from './guards/auth.guard';
import { NoGoToLoginGuard } from './guards/no-go-to-login.guard';

const routes: Routes = [
  // { path: '**', component:  },
  { path: 'login', component: LoginComponent,canActivate : [NoGoToLoginGuard] },
  { path: 'accueil', component: DashboardComponent,canActivate : [AuthGuard] },
  { path: 'produits', component: ProductsComponent,canActivate : [AuthGuard],
    children: [
      { path : 'produit/:id', component: SingleProductComponent},
      { path : 'modifier/:id', component: EditProductComponent},
      { path : '', component: AllProductsComponent},
      { path: '', pathMatch: 'full', redirectTo: '' },
    ]
  },
  { path: 'ventes', component: SalesComponent,canActivate : [AuthGuard],
    children: [
      { path : 'vente/:id', component: SingleSaleComponent},
      { path : '', component: AllSalesComponent},
      { path: '', pathMatch: 'full', redirectTo: '' },
    ]
  },
  { path: 'grossistes', component: WholesalersComponent,canActivate : [AuthGuard],
    children: [
      { path : 'ajouter', component: NewWholesalerComponent},
      { path : 'grossiste/:id', component: SingleWholesalerComponent},
      { path : 'modifier/:id', component: EditWholesalerComponent},
      { path : '', component: AllWholesalersComponent},
      { path: '', pathMatch: 'full', redirectTo: '' },
    ]
  },
  { path: 'semi-grossistes', component: SemiWholesalersComponent,canActivate : [AuthGuard],
    children: [
      { path : 'ajouter', component: NewSemiWholesalerComponent},
      { path : 'semi-grossiste/:id', component: SingleSemiWholesalerComponent},
      { path : 'modifier/:id', component: EditSemiWholesalerComponent},
      { path : '', component: AllSemiWholesalersComponent},
      { path: '', pathMatch: 'full', redirectTo: '' },
    ]
  },
  { path: 'administrateurs' , component: AdministratorsComponent ,canActivate : [AuthGuard],
    children: [
      { path : 'ajouter', component: NewAdminComponent},
      { path : 'administrateur/:id', component: SingleAdminComponent},
      { path : '', component: AllAdminsComponent},
      { path: '', pathMatch: 'full', redirectTo: '' },
    ]
  },
  { path: 'mon-compte', component: AdministratorsComponent,canActivate : [AuthGuard] ,
    children: [
      { path : '', component: EditAdminComponent},
      { path : '', component: EditAdminComponent},
      { path: '', pathMatch: 'full', redirectTo: '' },
    ]
  },
  { path: 'codes-qr', component: CodeQrComponent,canActivate : [AuthGuard] ,
    children: [
      { path : '', component: AllCodesQrComponent},
      { path: '', pathMatch: 'full', redirectTo: '' },
    ]
  },
  //Paramètres
  { path: 'parametres/groupes', component: GroupsComponent,canActivate : [AuthGuard],
    children: [
      { path : 'ajouter', component: NewGroupComponent},
      { path : 'modifier/:id', component: EditGroupComponent},
      { path : '', component: AllGroupsComponent},
      { path: '', pathMatch: 'full', redirectTo: '' },
    ]
  },
  { path: 'parametres/produits', component: ProductsComponent,canActivate : [AuthGuard],
    children: [
      { path : 'ajouter', component: NewProductComponent},
      { path : 'modifier/:id', component: EditProductComponent},
      { path : 'produit/:id', component: NewProductComponent},
      { path : '', component: AllProductsComponent},
      { path: '', pathMatch: 'full', redirectTo: '' },
    ]
  },
  { path: 'parametres/produits/marques', component: BrandsComponent,canActivate : [AuthGuard],
    children: [
      { path : 'ajouter', component: NewBrandComponent},
      { path : 'modifier/:id', component: EditBrandComponent},
      { path : '', component: AllBrandsComponent},
      { path: '', pathMatch: 'full', redirectTo: '' },
    ]
  },
  { path: 'parametres/agences-de-distribution', component: DistributionAgenciesComponent ,canActivate : [AuthGuard],
    children: [
      { path : 'ajouter', component: NewDistributionAgencyComponent},
      { path : 'modifier/:id', component: EditDistributionAgencyComponent},
      { path : '', component: AllDistributionAgenciesComponent},
      { path: '', pathMatch: 'full', redirectTo: '' },
    ]
  },
  { path: 'parametres/villes', component: CitiesComponent,canActivate : [AuthGuard],
    children: [
      { path : 'ajouter', component: NewCityComponent},
      { path : 'modifier/:id', component: EditCityComponent},
      { path : '', component: AllCitiesComponent},
      { path: '', pathMatch: 'full', redirectTo: '' },
    ]
  },
  //Route par défaut
  { path: '', pathMatch: 'full', redirectTo: 'accueil' },
  { path: '**', pathMatch: 'full', redirectTo: 'accueil' },
  // { path: '**', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration : 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
