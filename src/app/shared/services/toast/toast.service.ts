import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  /* private toastText: string = '';
  private toastIcon: SweetAlertIcon = 'success';
  private toastTitle: string = '';

  private toastObject: SweetAlertOptions = {
    text: this.toastText,
    icon: this.toastIcon,
    title: this.toastTitle,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    showCloseButton: true,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  }

  constructor() { }

  public errorToast(title: string, text: string = ''){
    this.toastObject.title = title
    this.toastObject.icon = "error";
    this.toastObject.text = text;
    Swal.fire(this.toastObject)
  }

  public successToast(title: string, text: string = ''){
    this.toastObject.title = title
    this.toastObject.icon = "success";
    this.toastObject.text = text;
    Swal.fire(this.toastObject)
  }

  public infoToast(title: string, text: string = ''){
    this.toastObject.title = title
    this.toastObject.icon = "info";
    this.toastObject.text = text;
    this.toastObject.html = text;
    Swal.fire(this.toastObject)
  }

  public warningToast(title: string, text: string = ''){
    this.toastObject.title = title
    this.toastObject.icon = "warning";
    this.toastObject.text = text;
    this.toastObject.html = text;
    Swal.fire(this.toastObject)
  } */

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
