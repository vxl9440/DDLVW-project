import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentQueueInterfaceComponent } from './components/student-queue-interface/student-queue-interface.component';
import { FrontDeskInterfaceComponent } from './components/front-desk-interface/front-desk-interface.component';
import { AdvisorInterfaceComponent } from './components/advisor-interface/advisor-interface.component';
import { InterfacePickerComponent } from './components/interface-picker/interface-picker.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

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
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
