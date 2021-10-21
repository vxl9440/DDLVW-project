import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentQueueInterfaceComponent } from './student-queue-interface/student-queue-interface.component';
import { FrontDeskInterfaceComponent } from './front-desk-interface/front-desk-interface.component';
import { AdvisorInterfaceComponent } from './advisor-interface/advisor-interface.component';
import { InterfacePickerComponent } from './interface-picker/interface-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentQueueInterfaceComponent,
    FrontDeskInterfaceComponent,
    AdvisorInterfaceComponent,
    InterfacePickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
