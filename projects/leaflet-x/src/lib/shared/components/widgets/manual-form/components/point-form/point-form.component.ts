import { FormService } from "./../../../../../services/form/form.service"
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastService } from './../../../../../services/toast/toast.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-point-form',
  templateUrl: './point-form.component.html',
  styleUrls: ['./point-form.component.sass'],
})
export class PointFormComponent implements OnInit {
  points = [];
  constructor(
    public toastService: ToastService,
    private formService: FormService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  public get formPoint(): any {
    return this.formService.Points;
  }

  ngOnInit() {}

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
      confirmButtonText: 'Sí, eliminarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.formService.removePointAt(index);

        this.toastService.warningToast(
          '¡Eliminado!',
          'El vértice ha sido eliminado correctamente.'
        );
      }
    });
  }
}
