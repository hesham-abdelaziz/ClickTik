import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path : '' , component : HomeComponent , canActivate : [AuthGuard]},



  {path : 'login' , component : AuthComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
