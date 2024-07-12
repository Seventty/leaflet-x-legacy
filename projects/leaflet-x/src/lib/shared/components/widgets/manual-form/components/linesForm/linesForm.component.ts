import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormService } from 'projects/leaflet-x/src/lib/shared/services/form/form.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-linesForm',
  templateUrl: './linesForm.component.html',
  styleUrls: ['./linesForm.component.sass'],
})
export class LinesFormComponent implements OnInit {
  /**Lista de linea */
  indexPanelOpen = null;

  constructor(private formService: FormService) {}

  public get formArrayLine(): any {
    return this.formService.LineString;
  }

  ngOnInit() {}

  togglePanel(index: number) {
    if (index === this.indexPanelOpen) {
      this.indexPanelOpen = null;
    } else {
      this.indexPanelOpen = index;
    }
  }

  addNewLine() {
    this.formService.addLineString();
  }

  addVertice(indexLine: number) {
    this.formService.addPointInLineString(indexLine);
  }

  deleteLine(index: number) {
    let message = `¿Quieres eliminar la "línea ${index + 1}"?`;

    // Verificar si existen vértices
    if (this.formArrayLine.controls[index].controls.lenght > 0) {
      message = `¿Quieres eliminar la línea "${index}" con sus ${this.formArrayLine.controls[index].controls.lenght} vértices?`;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Eliminar la línea
        this, this.formService.removeLineStringAt(index);
        Swal.fire(
          '¡Eliminado!',
          'La línea ha sido eliminada correctamente.',
          'success'
        );
      }
    });
  }

  deleteVertice(indexLinea: number, indexVertice: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar el vértice ${indexVertice + 1} del panel linea ${
        indexVertice + 1
      }?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.formService.removeLineStringAt(indexLinea, indexVertice);
        Swal.fire(
          'Eliminado',
          'El vértice ha sido eliminado correctamente.',
          'success'
        );
      }
    });
  }
}
