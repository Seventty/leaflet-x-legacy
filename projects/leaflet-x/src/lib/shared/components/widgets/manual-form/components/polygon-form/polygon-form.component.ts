import { Component, OnInit } from '@angular/core';
import { FormService } from 'projects/leaflet-x/src/lib/shared/services/form/form.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-polygon-form',
  templateUrl: './polygon-form.component.html',
  styleUrls: ['./polygon-form.component.sass']
})
export class PolygonFormComponent implements OnInit {

  formPoligonos: any
  indexPanelOpen: number = null;

  constructor(public toastService:ToastService, public formService: FormService) {
    this.formPoligonos = formService.Polygon
  }

  ngOnInit() {
  }

  togglePanel(index:number){
    if (index === this.indexPanelOpen) {
      this.indexPanelOpen = null;
    }else{
      this.indexPanelOpen = index;
    }
  }

  addNewPolygon() {
   this.formService.addPolygon();
  }

  addVertice(index: number) {
    this.formService.addPointInPolygon(index)
  }

  deletePolygon(index: number) {

    let message = `¿Quieres eliminar el polígono "polígono${index + 1}"?`;

    // Verificar si existen vértices
    if (this.formPoligonos.at(index).controls.length > 0) {
      message = `¿Quieres eliminar el polígono "polígono ${index + 1}" con sus ${this.formPoligonos.at(index).controls.length} vértices?`;
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
        this.formService.removePolygonAt(index)
        this.toastService.warningToast('¡Eliminado!', 'El polígono ha sido eliminada correctamente.');
      }
    });
  }

  deleteVertice(index: number, verticeIndex: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar el vértice ${verticeIndex + 1} del polígono ${index + 1}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.formService.removePolygonAt(index, verticeIndex)
        // Swal.fire(
        //   'Eliminado',
        //   'El vértice ha sido eliminado correctamente.',
        //   'success'
        // );
        this.toastService.warningToast('¡Eliminado!', 'El vértice ha sido eliminado correctamente.');
      }
    });
  }
}
