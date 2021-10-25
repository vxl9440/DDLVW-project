import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InterfacePickerComponent } from './components/interface-picker/interface-picker.component';
import { StudentQueueInterfaceComponent } from './components/student-queue-interface/student-queue-interface.component';
import { FrontDeskInterfaceComponent } from './components/front-desk-interface/front-desk-interface.component';
import { AdvisorInterfaceComponent } from './components/advisor-interface/advisor-interface.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminInterfaceComponent } from './components/admin-interface/admin-interface.component';
import { AdvisorResolver } from './resolvers/advisor.resolver';
import { LoginGuard } from './guards/login.guard';
import { UserRole } from './models/user-role';

const routes: Routes = [
  {
    path: 'queue',
    component: StudentQueueInterfaceComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRole.Admin, UserRole.Manager] }
  },
  {
    path: 'management',
    component: FrontDeskInterfaceComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRole.Admin, UserRole.Manager] }
  },
  {
    path: 'advisor',
    component: AdvisorInterfaceComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRole.Advisor, UserRole.Admin] }
    //resolve: { advisor: AdvisorResolver }
  },
  { 
    path: 'login', 
    canActivate: [LoginGuard],
    children: []
  },
  {
    path: 'admin',
    component: AdminInterfaceComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRole.Admin] }
  },
  {
    path: '**',
    component: InterfacePickerComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
