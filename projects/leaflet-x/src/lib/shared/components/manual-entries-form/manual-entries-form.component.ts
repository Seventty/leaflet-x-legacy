import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { IModalConfig } from '../../modal/IModalConfig';
import { IModalOption } from '../../modal/IModalOptions';
import { ModalComponent } from '../../modal/modal.component';
import { LinesFormComponent } from './components/lines-form/lines-form.component';
import { ManualEntriesService } from './manual-entries.service';
import { PointFormComponent } from './components/point-form/point-form.component';
import { PolygonFormComponent } from './components/polygon-form/polygon-form.component';
import { FileManagerService } from '../../services/file-manager/file-manager.service';

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
  @Input() modalReference?: ModalComponent

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

  constructor(private fb: FormBuilder, private manualEntriesService: ManualEntriesService, private fileManagerService: FileManagerService) {
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
    const pointGeojson = this.manualEntriesService.mapPointsToGeojson(this.pointFormComponent.getPointForm.value)
    const polygonGeojson = this.manualEntriesService.mapPolygonToGeojson(this.polygonFormComponent.getPolygonForm.value)
    const formsMergeFeatureCollection: any = this.mergeGeoJson(lineGeojson, pointGeojson, polygonGeojson);
    this.fileManagerService.setFeatureCollection(formsMergeFeatureCollection);
    this.closeModal()
  }

  mergeGeoJson(lineFeatures: any, pointFeatures: any, polygonFeatures: any) {
    const mergedFeatures = [
      ...lineFeatures.features,
      ...pointFeatures.features,
      ...polygonFeatures.features
    ];

    return {
      type: "FeatureCollection",
      features: mergedFeatures
    };
  }

  closeModal(){
    this.modalReference.close()
  }

  openPreviewModal() {
    this.previewModal.open();
  }

  ngOnInit() {
  }

}
