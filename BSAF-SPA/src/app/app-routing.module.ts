import { MainlayoutComponent } from './mainlayout/mainlayout.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BeneficiarySearchComponent } from './beneficiary/beneficiary-search/beneficiary-search.component';
import { BeneficiaryFormComponent } from './beneficiary/beneficiary-form/beneficiary-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { BeneficiaryResolverService } from './_resolvers/beneficiary-resolver.service';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: MainlayoutComponent, canActivate: [AuthGuard],
  children: [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {
      path: 'beneficiaryForm',
       component: BeneficiaryFormComponent,
       resolve: {
        initialLookups: BeneficiaryResolverService
      }
      },
    {path: 'beneficiarySearch', component: BeneficiarySearchComponent},
    {path: 'userManagement',  data: { roles: ['Admin']}, canActivate: [AuthGuard], component: UserManagementComponent},
    {path: '**', component: PageNotFoundComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
