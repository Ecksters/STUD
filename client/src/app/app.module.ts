import { FormsModule } from '@angular/forms';
import { SystemMessageService } from './shared/services/systemMessage.service';
import { ToastOptions } from 'ng2-toastr/src/toast-options';
import { CustomToastOptions } from './shared/interceptors/custom-toast-options';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { UsersService } from './shared/services/users.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SharedService } from './shared/services/shared.service';
import { routing } from './app.routing';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    routing,
    ToastModule.forRoot()
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    SharedService,
    UsersService,
    {
      provide: ToastOptions,
      useClass: CustomToastOptions
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    SystemMessageService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
