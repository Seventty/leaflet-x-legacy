import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-point-form',
  templateUrl: './point-form.component.html',
  styleUrls: ['./point-form.component.sass']
})
export class PointFormComponent implements OnInit {
  points = [];

  constructor() { }

  ngOnInit() {
  }

  addNewPoint() {
    const newPoint = { longitud: '', latitud: '' };
    this.points.push(newPoint);
    console.log('Points after addition:', this.points);
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
        this.points.splice(index, 1);
        console.log('Points after deletion:', this.points);
        Swal.fire(
          'Eliminado',
          'El vértice ha sido eliminado correctamente.',
          'success'
        );
      }
    });
  }

  handlePointChange(index: number, point: any) {
    this.points[index] = point;
    console.log('Updated points:', this.points);
  }

}
