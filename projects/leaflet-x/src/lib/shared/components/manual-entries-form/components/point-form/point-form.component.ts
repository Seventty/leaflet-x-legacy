import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'point-form',
  templateUrl: './point-form.component.html',
  styleUrls: ['./point-form.component.sass']
})
export class PointFormComponent implements OnInit {
  pointsForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {
    this.pointsForm = this.fb.group({
      points: this.fb.array([])
    })
  }

  ngOnInit() {
  }

  addPoints() {
    this.points.push(this.newPoint());
  }

  get points() {
    return this.pointsForm.get('points') as FormArray;
  }

  get getPointForm(){
    return this.pointsForm;
  }

  newPoint(): FormGroup {
    return this.fb.group({
      expanded: false,
      latitude: [null, Validators.required],
      longitude: [null, Validators.required]
    });
  }

  toggleExpandPoint(index: number) {
    const point = this.points.at(index);
    point.get('expanded')?.setValue(!point.get('expanded')?.value);
  }

  deletePoint(index: number) {
    this.points.removeAt(index);
  }

}
