import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InterfacePickerComponent } from './interface-picker/interface-picker.component';
import { StudentQueueInterfaceComponent } from './student-queue-interface/student-queue-interface.component';
import { FrontDeskInterfaceComponent } from './front-desk-interface/front-desk-interface.component';
import { AdvisorInterfaceComponent } from './advisor-interface/advisor-interface.component';

const routes: Routes = [
  { path: 'interface-picker', component: InterfacePickerComponent },
  { path: 'student-queue-interface', component: StudentQueueInterfaceComponent },
  { path: 'front-desk-interface', component: FrontDeskInterfaceComponent },
  { path: 'advisor-interface', component: AdvisorInterfaceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
