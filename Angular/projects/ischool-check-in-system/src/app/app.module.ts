import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentQueueInterfaceComponent } from './components/student-queue-interface/student-queue-interface.component';
import { FrontDeskInterfaceComponent } from './components/front-desk-interface/front-desk-interface.component';
import { AdvisorInterfaceComponent } from './components/advisor-interface/advisor-interface.component';
import { InterfacePickerComponent } from './components/interface-picker/interface-picker.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminInterfaceComponent } from './components/admin-interface/admin-interface.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentQueueInterfaceComponent,
    FrontDeskInterfaceComponent,
    AdvisorInterfaceComponent,
    InterfacePickerComponent,
    AdminInterfaceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
