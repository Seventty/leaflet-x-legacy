import { FormService } from 'projects/leaflet-x/src/lib/shared/services/form/form.service';
import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import Swal from 'sweetalert2';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-point-form',
  templateUrl: './point-form.component.html',
  styleUrls: ['./point-form.component.sass']
})
export class PointFormComponent implements OnInit {
  points = [];
  formPoint: any;

  constructor(public toastService:ToastService, private formService: FormService) {
   this.formPoint = formService.Points
  }

  ngOnInit() {
    console.log(this.formPoint);

  }

  addNewPoint() {
   this.formService.addPoint();
  }

  deletePoint(index: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar el vértice ${index + 1}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.formService.removePointAt(index)
        this.toastService.warningToast('¡Eliminado!', 'El vértice ha sido eliminado correctamente.')
      }
    });
  }
}
