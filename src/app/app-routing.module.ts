import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './guards/auth.guard';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';

const routes: Routes = [

  {path: 'users', component: UserComponent, canActivate: [AuthGuard] },
  {path: 'admin-interface', component: AdminInterfaceComponent, canActivate: [AdminAuthGuard] },
  {path: 'login', component: LoginComponent},
  {path: 'forbidden', component: ForbiddenPageComponent},
  {path: 'page-not-found', component: PageNotFoundComponent},
  {path: '', redirectTo: 'users', pathMatch: 'full'}


];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
