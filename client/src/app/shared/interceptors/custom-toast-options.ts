import { ToastOptions } from 'ng2-toastr/src/toast-options';

export class CustomToastOptions extends ToastOptions {
  animate = 'flyRight'; // you can override any options available
  showCloseButton = true;
  positionClass = 'toast-bottom-right';
  enableHTML = true;
  toastLife = 10000;
}
