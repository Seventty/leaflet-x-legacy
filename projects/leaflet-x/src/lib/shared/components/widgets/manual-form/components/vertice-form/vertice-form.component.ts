import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vertice-form',
  templateUrl: './vertice-form.component.html',
  styleUrls: ['./vertice-form.component.sass']
})
export class VerticeFormComponent {
  @Input() vertice: any;
  @Input() verticeIndex: number;
  @Input() panelIndex: number;
  @Output() delete = new EventEmitter<number>();
  @Output() verticeChange = new EventEmitter<{ index: number, vertice: any }>();

  onVerticeChange() {
    this.verticeChange.emit({ index: this.verticeIndex, vertice: this.vertice });
  }

  onDelete() {
    this.delete.emit(this.verticeIndex);
    this.onVerticeChange();
  }
}
