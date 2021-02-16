import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { BiddingSectionComponent } from './bidding-section/bidding-section.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { SendCourierComponent } from './send-courier/send-courier.component';

const routes: Routes = [
  {
    path:'',
    component: HomePageComponent,
    pathMatch:'full'
  },
  {
    path: 'bidding-section',
    component: BiddingSectionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'navbar',
    component: NavbarComponent,
   
  },
  {
    path: 'footer',
    component: FooterComponent,
  },
  {
    path: 'send-courier',
    component: SendCourierComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
