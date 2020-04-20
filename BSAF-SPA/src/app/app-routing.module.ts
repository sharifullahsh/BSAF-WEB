import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BeneficiarySearchComponent } from './beneficiary-search/beneficiary-search.component';
import { BeneficiaryFormComponent } from './beneficiary-form/beneficiary-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [AuthGuard], data: { roles: ['Admin', 'DataEntry'] }
  },
  {
    path: 'beneficiaryForm', component: BeneficiaryFormComponent,
    canActivate: [AuthGuard], data: { roles: ['Admin', 'DataEntry'] }
  },
  {
    path: 'beneficiarySearch', component: BeneficiarySearchComponent,
    canActivate: [AuthGuard], data: { roles: ['Admin', 'DataEntry'] }
  },
  { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: '**', component: PageNotFoundComponent,
    canActivate: [AuthGuard], data: { roles: ['Admin', 'DataEntry'] }
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
