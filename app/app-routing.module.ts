import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ServiceComponent } from './service/service.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './notfound/notfound.component';
import {LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { from } from 'rxjs';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignUpComponent},
  { path: 'about', component: AboutComponent },
  { path: 'features', component: ServiceComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'course', component: GalleryComponent },

  {path:'404',component:NotfoundComponent},
  {path:'**',redirectTo:'/404'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
