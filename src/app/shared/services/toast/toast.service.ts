import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private defaultOptions: SweetAlertOptions = {
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    showCloseButton: true,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  }

  private showToast(icon: SweetAlertIcon, title: string, text: string, customOptions: Partial<SweetAlertOptions> = {}): void{
    const toastOptions: SweetAlertOptions = Object.assign({}, this.defaultOptions, customOptions, { icon, title, text });
    Swal.fire(toastOptions);
  }

  public errorToast(title: string, text: string = '', customOptions: Partial<SweetAlertOptions> = {}): void {
    this.showToast('error', title, text, customOptions);
  }

  public successToast(title: string, text: string = '', customOptions: Partial<SweetAlertOptions> = {}): void {
    this.showToast('success', title, text, customOptions);
  }

  public infoToast(title: string, text: string = '', customOptions: Partial<SweetAlertOptions> = {}): void {
    this.showToast('info', title, text, customOptions);
  }

  public warningToast(title: string, text: string = '', customOptions: Partial<SweetAlertOptions> = {}): void {
    this.showToast('warning', title, text, customOptions);
  }

  constructor(){}


}
