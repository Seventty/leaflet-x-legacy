import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

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

  onDelete() {
    this.delete.emit(this.verticeIndex);
  }
}
