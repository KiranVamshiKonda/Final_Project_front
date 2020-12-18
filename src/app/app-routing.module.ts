import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';
import { P404Component } from './p404/p404.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AddbudgetComponent } from './addbudget/addbudget.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch : 'full'
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'login',
    component: LoginComponent,

  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'homepage',
    component: HomepageComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component:SignupComponent,
    pathMatch : 'full'
  },
  {
    path: 'addbudget',
    component: AddbudgetComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path:'logout',
    component: LoginComponent
  },

  {
    path: '**',
    component: P404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
