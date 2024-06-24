import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { IModalConfig } from '../../modal/IModalConfig';
import { IModalOption } from '../../modal/IModalOptions';
import { ModalComponent } from '../../modal/modal.component';
import { LinesFormComponent } from './components/lines-form/lines-form.component';
import { ManualEntriesService } from './manual-entries.service';
import { PointFormComponent } from './components/point-form/point-form.component';
import { PolygonFormComponent } from './components/polygon-form/polygon-form.component';

@Component({
  selector: 'manual-entries-form',
  templateUrl: './manual-entries-form.component.html',
  styleUrls: ['./manual-entries-form.component.sass']
})
export class ManualEntriesFormComponent implements OnInit {
  @ViewChild("previewModal") previewModal?: ModalComponent;
  @ViewChild(LinesFormComponent) linesFormComponent: LinesFormComponent;
  @ViewChild(PointFormComponent) pointFormComponent: PointFormComponent;
  @ViewChild(PolygonFormComponent) polygonFormComponent: PolygonFormComponent;

  previewModalConfig: IModalConfig = {
    modalTitle: 'Vista previa del mapa',
    dashboardHeader: true,
  }

  previewModalOption: IModalOption = {
    centered: true,
    size: 'md',
  }

  linesForm: FormGroup = new FormGroup({});

  isLineFormCollapsed = true;
  isPointFormCollapsed = true;
  isPolygonFormCollapsed = true;
  /* isCollapsed2 = true;
  isCollapsed3 = true;
  isCollapsed4 = true; */

  constructor(private fb: FormBuilder, private manualEntriesService: ManualEntriesService) {
    this.linesForm = this.fb.group({
      lineas: this.fb.array([])
    });
  }

  sendForms(){
    console.log(this.manualEntriesService.formToGeoJson(this.linesFormComponent.getLinesForm.value))
    //this.manualEntriesService.formToGeoJson(this.linesFormComponent);
    //console.log("Formulario de puntos"), this.pointFormComponent
    //console.log("Formulario de poligonos", this.polygonFormComponent)
  }

  /*
  get lines() {
    return this.form.get('lines') as FormArray;
  }

  get squares() {
    return this.form.get('squares') as FormArray;
  }

  get points() {
    return this.form.get('points') as FormArray;
  }

  get polygons() {
    return this.form.get('polygons') as FormArray;
  }

  addInput(array: FormArray) {
    array.push(this.fb.control(''));
  }

  removeInput(array: FormArray, index: number) {
    array.removeAt(index);
  }

  */

  openPreviewModal() {
    this.previewModal.open();
  }

  ngOnInit() {
  }

}
