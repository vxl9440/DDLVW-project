import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InterfacePickerComponent } from './interface-picker/interface-picker.component';
import { StudentQueueInterfaceComponent } from './student-queue-interface/student-queue-interface.component';
import { FrontDeskInterfaceComponent } from './front-desk-interface/front-desk-interface.component';
import { AdvisorInterfaceComponent } from './advisor-interface/advisor-interface.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  //{ path: 'interface-picker', component: InterfacePickerComponent },
  { path: 'queue', component: StudentQueueInterfaceComponent },
  { path: 'management', component: FrontDeskInterfaceComponent },
  { path: 'advisor', component: AdvisorInterfaceComponent },
  { path: '**', component: InterfacePickerComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
