import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vertice-form',
  templateUrl: './vertice-form.component.html',
  styleUrls: ['./vertice-form.component.sass']
})
export class VerticeFormComponent {
  @Input() fromGroup: FormGroup;
  @Input() vertice: any;
  @Input() verticeIndex: number;
  @Input() panelIndex: number;
  @Output() delete = new EventEmitter<number>();
  @Output() verticeChange = new EventEmitter<{ index: number, vertice: any }>();

  get latitudControl(): FormControl { // Cambio de tipo de retorno
    return this.fromGroup.controls['lat'] as FormControl; // Typecasting
  }

  get longitudControl(): FormControl { // Cambio de tipo de retorno
    return this.fromGroup.controls['long'] as FormControl; // Typecasting
  }

  constructor() { }

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'es requerida.';
    } else if (control.hasError('latOutOfRange')) {
      return 'no válida.';
    } else if (control.hasError('longOutOfRange')) {
      return 'no válida.';
    }
    return ''; // No hay error o error desconocido
  }

  onDelete() {
    this.delete.emit(this.verticeIndex);
  }
}
