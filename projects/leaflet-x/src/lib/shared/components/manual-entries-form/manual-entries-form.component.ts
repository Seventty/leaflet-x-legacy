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
  pointForm: FormGroup = new FormGroup({});
  squareForm: FormGroup = new FormGroup({});

  isLineFormCollapsed = true;
  isPointFormCollapsed = true;
  isPolygonFormCollapsed = true;

  constructor(private fb: FormBuilder, private manualEntriesService: ManualEntriesService) {
    this.linesForm = this.fb.group({
      lineas: this.fb.array([])
    });

    this.pointForm = this.fb.group({
      points: this.fb.array([])
    });

    this.squareForm = this.fb.group({
      squares: this.fb.array([])
    });
  }

  sendForms(){
    const lineGeojson = this.manualEntriesService.mapLineToGeojson(this.linesFormComponent.getLinesForm.value);
    const pointGeojson = this.pointFormComponent.getPointForm.value;
    const polygonGeojson = this.pointFormComponent.getPointForm.value;

    //this.manualEntriesService.formToGeoJson(this.linesFormComponent);
    //console.log("Formulario de puntos"), this.pointFormComponent
    //console.log("Formulario de poligonos", this.polygonFormComponent)
  }


  openPreviewModal() {
    this.previewModal.open();
  }

  ngOnInit() {
  }

}
