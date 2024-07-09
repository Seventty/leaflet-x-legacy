import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-linesForm',
  templateUrl: './linesForm.component.html',
  styleUrls: ['./linesForm.component.sass']
})
export class LinesFormComponent implements OnInit {

  panelsLine: any[] = [];
  allVertices: any[] = [];

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

  addNewLine() {
    const newLine = {
      title: `Linea ${this.panelsLine.length + 1}`,
      vertices: [],
      isCollapsed: true
    };
    this.panelsLine.push(newLine);
  }

  addVertice(panel: any) {
    const newVertice = {
      longitud: '',
      latitud: ''
    };
    panel.vertices.push(newVertice);
    this.allVertices.push(newVertice);
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

  deleteVertice(panel: any, verticeIndex: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar el vértice ${verticeIndex + 1} del panel ${panel.title}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        const vertice = panel.vertices[verticeIndex];
        this.allVertices = this.allVertices.filter(v => v !== vertice);
        panel.vertices.splice(verticeIndex, 1);
        console.log('All vertices after deletion:', this.allVertices);
        Swal.fire(
          'Eliminado',
          'El vértice ha sido eliminado correctamente.',
          'success'
        );
      }
    });
  }

  handleVerticeChange(panelIndex: number, verticeIndex: number, vertice: any) {
    console.log(`Panel ${panelIndex + 1}, Vertice ${verticeIndex + 1}:`, vertice);
    this.panelsLine[panelIndex].vertices[verticeIndex] = vertice;
    console.log('All vertices:', this.allVertices);
  }

}
