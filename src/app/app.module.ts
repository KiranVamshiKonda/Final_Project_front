import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HeroComponent } from './hero/hero.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ArticleComponent } from './article/article.component';
import { AboutComponent } from './about/about.component';
import { P404Component } from './p404/p404.component';

import { ContactComponent } from './contact/contact.component';
import { PieComponent } from './pie/pie.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AddbudgetComponent } from './addbudget/addbudget.component';
import { TableComponent } from './table/table.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DataService } from './data.service';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogoutComponent } from './logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LineComponent } from './line/line.component';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeroComponent,
    FooterComponent,
    HomepageComponent,
    ArticleComponent,
    AboutComponent,
    LoginComponent,
    P404Component,
    ContactComponent,
    PieComponent,
    SignupComponent,
    AddbudgetComponent,
    TableComponent,
    BarChartComponent,
    LogoutComponent,
    DashboardComponent,
    LineComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-left',
      preventDuplicates: true
    })
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
