import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-linesForm',
  templateUrl: './linesForm.component.html',
  styleUrls: ['./linesForm.component.sass']
})
export class LinesFormComponent implements OnInit {

  panelsLine: any[] = [];
  isVerticeFormCollapsed = false;

  constructor() { }

  ngOnInit() {
  }

  togglePanel(panel: any) {
    this.panelsLine.forEach(p => {
      if (p !== panel) {
        p.isCollapsed = true;
      }
    });
    panel.isCollapsed = !panel.isCollapsed;
  }

  toggleVerticeForm(panel: any) {
    panel.isVerticeFormCollapsed = !panel.isVerticeFormCollapsed;
  }

  addNewLine() {
    const newLine = {
      title: `Linea ${this.panelsLine.length + 1}`,
      content: '', // Inicialmente vacío
      vertices: [], // Arreglo para mantener los vértices
      isCollapsed: true
    };
    this.panelsLine.push(newLine);
  }



  deleteLine(index: number) {
    const panel = this.panelsLine[index];
    let message = `¿Quieres eliminar la línea "${panel.title}"?`;

    // Verificar si existen vértices
    if (panel.vertices.length > 0) {
      message = `¿Quieres eliminar la línea "${panel.title}" con sus ${panel.vertices.length} vértices?`;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Eliminar la línea
        this.panelsLine.splice(index, 1);
        Swal.fire(
          '¡Eliminado!',
          'La línea ha sido eliminada correctamente.',
          'success'
        );
      }
    });
  }

  addVertice(panel: any) {
    const newVertex = `Vertice ${panel.vertices.length + 1} - ${panel.title}`;
    panel.vertices.push(newVertex);

    // Actualizar el contenido del panel
    panel.content = panel.vertices.join(', ');
  }


}
