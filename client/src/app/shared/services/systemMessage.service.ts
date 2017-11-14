import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';
import { Injectable, Injector } from '@angular/core';
import { SharedService } from './shared.service';


@Injectable()
export class SystemMessageService {
  public toastr;
  constructor(injector: Injector, public router: Router) {
    setTimeout(() => {
      const errorDisplay = injector.get(SharedService);
      this.toastr = injector.get(ToastsManager);
      this.toastr.setRootViewContainerRef(errorDisplay.vcRef);
      this.toastr.onClickToast()
      .subscribe( toast => {
          if (toast.data && toast.data.url) {
            // navigate to
            this.router.navigate([toast.data.url]);
          }
      });
    });
  }

  getPrettyErrors(fieldErrors: any) {
    if (fieldErrors === null) {
      return null;
    } else {
      let prettyErrors = [];
      for (const error of Object.keys(fieldErrors)) {
        let errorMessage;
        switch (error) {
          case 'minlength':
            errorMessage = 'Must be at least ' + fieldErrors[error].requiredLength + ' characters';
            break;
          case 'required':
            errorMessage = 'Field required';
            break;
          default:
            errorMessage = 'Check for errors';
            break;
        }
        prettyErrors.push(errorMessage);
      }
      return prettyErrors;
    }
  }

  randomWord(length: number): string {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const consts =  ['b', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p',
                    'r', 's', 't', 'v', 'w', 'y', 'z', 'ch', 'sh', 'th'];
    let word = '';
    let is_vowel = false;
    let arr;

    for (let i = 0; i < length; i++) {
      if (is_vowel) {
        arr = vowels;
      } else {
        arr = consts;
      }
      is_vowel = !is_vowel;
      word += arr[Math.round(Math.random() * (arr.length - 1))];
    }
    return word;
  }
}
