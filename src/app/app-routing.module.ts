import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { RouteGuardService } from './service/route-guard-service';


const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [RouteGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
