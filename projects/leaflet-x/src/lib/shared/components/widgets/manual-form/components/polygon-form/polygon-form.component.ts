import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-polygon-form',
  templateUrl: './polygon-form.component.html',
  styleUrls: ['./polygon-form.component.sass']
})
export class PolygonFormComponent implements OnInit {

  panelsPolygon: any[] = [];
  allVertices: any[] = [];

  constructor(public toastService:ToastService) { }

  ngOnInit() {
  }

  togglePanel(panel: any) {
    this.panelsPolygon.forEach(p => {
      if (p !== panel) {
        p.isCollapsed = true;
      }
    });
    panel.isCollapsed = !panel.isCollapsed;
  }

  addNewPolygon() {
    const newLine = {
      title: `Polígono ${this.panelsPolygon.length + 1}`,
      vertices: [],
      isCollapsed: true
    };
    this.panelsPolygon.push(newLine);
  }

  addVertice(panel: any) {
    const newVertice = {
      longitud: '',
      latitud: ''
    };
    panel.vertices.push(newVertice);
    this.allVertices.push(newVertice);
  }

  deletePolygon(index: number) {
    const panel = this.panelsPolygon[index];
    let message = `¿Quieres eliminar el polígono "${panel.title}"?`;

    // Verificar si existen vértices
    if (panel.vertices.length > 0) {
      message = `¿Quieres eliminar el polígono "${panel.title}" con sus ${panel.vertices.length} vértices?`;
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
        this.panelsPolygon.splice(index, 1);
        // Swal.fire(
        //   '¡Eliminado!',
        //   'El polígono ha sido eliminada correctamente.',
        //   'success'
        // );
        this.toastService.warningToast('¡Eliminado!', 'El polígono ha sido eliminada correctamente.');
      }
    });
  }

  deleteVertice(panel: any, verticeIndex: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar el vértice ${verticeIndex + 1} del polígono ${panel.title}?`,
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
        // Swal.fire(
        //   'Eliminado',
        //   'El vértice ha sido eliminado correctamente.',
        //   'success'
        // );
        this.toastService.warningToast('¡Eliminado!', 'El vértice ha sido eliminado correctamente.');
      }
    });
  }

  handleVerticeChange(panelIndex: number, verticeIndex: number, vertice: any) {
    console.log(`Panel ${panelIndex + 1}, Vertice ${verticeIndex + 1}:`, vertice);
    this.panelsPolygon[panelIndex].vertices[verticeIndex] = vertice;
    console.log('All vertices:', this.allVertices);
  }

}
