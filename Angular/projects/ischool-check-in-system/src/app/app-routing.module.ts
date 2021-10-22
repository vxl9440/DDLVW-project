import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InterfacePickerComponent } from './components/interface-picker/interface-picker.component';
import { StudentQueueInterfaceComponent } from './components/student-queue-interface/student-queue-interface.component';
import { FrontDeskInterfaceComponent } from './components/front-desk-interface/front-desk-interface.component';
import { AdvisorInterfaceComponent } from './components/advisor-interface/advisor-interface.component';
import { LoginComponent } from './components/login/login.component';
import { AdvisorGuard } from './guards/advisor.guard';
import { AdvisorResolver } from './resolvers/advisor.resolver';

const routes: Routes = [
  { path: 'queue', component: StudentQueueInterfaceComponent },
  { path: 'management', component: FrontDeskInterfaceComponent },
  { 
    path: 'advisor', 
    component: AdvisorInterfaceComponent, 
    canActivate: [AdvisorGuard],
    //resolve: { advisor: AdvisorResolver } 
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: InterfacePickerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
