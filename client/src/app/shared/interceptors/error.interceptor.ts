import { Injectable } from '@angular/core';
import { SystemMessageService } from './../services/systemMessage.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    errorDisplay: any;
    toastr: any;
    errorMessage = 'Error occured with request';


  constructor(private messages: SystemMessageService) {}

  isJsonString(str): boolean {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    const newReq = req.clone( { withCredentials: true } );

    return next
      .handle(newReq)
      .do(event => {
        if (event instanceof HttpResponse) {
          if (event.body === null || event.headers.get('Content-Type') !== 'application/json; charset=UTF-8'
            || (event.body.results && event.body.results.errors)) {
            this.errorMessage = 'Error occured with request';
            if (this.isJsonString(event.body)) {
              this.errorMessage = 'Invalid JSON response, ask administrator for help.';
            }
            throw new HttpErrorResponse(event);
          }
        }
      })
      .catch((error: any) => {
        console.log(`Waited for response from ${req.urlWithParams} for ${Date.now() - started} ms.`);
        console.log('Error occured: ', JSON.stringify(error));
        if (error instanceof HttpErrorResponse) {
          if (error.headers.get('Content-Type') !== 'application/json; charset=UTF-8') {
            this.errorMessage = 'Non-JSON response, ask administrator for help.';
          } else if (error.error && error.error.errors) {
            console.log('Server returned', error.error.errors[0].errorType, 'error, "' + error.error.errors[0].message + '"');
          } else if (error.status === 200) {
              this.errorMessage = 'Server returned empty response';
          }
        } else {
          this.errorMessage = 'Non-HTTP error occured.';
        }
        this.messages.toastr.error(this.errorMessage, 'Server Error');
        return Observable.throw(error);
      });
  }
}
