import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { IModalConfig } from '../../modal/IModalConfig';
import { IModalOption } from '../../modal/IModalOptions';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'manual-entries-form',
  templateUrl: './manual-entries-form.component.html',
  styleUrls: ['./manual-entries-form.component.sass']
})
export class ManualEntriesFormComponent implements OnInit {
  @ViewChild("previewModal") previewModal?: ModalComponent;

  previewModalConfig: IModalConfig = {
    modalTitle: 'Vista previa del mapa',
    dashboardHeader: true,
  }

  previewModalOption: IModalOption = {
    centered: true,
    size: 'md',
  }

  isLineFormCollapsed = true;
  isCollapsed2 = true;
  isCollapsed3 = true;
  isCollapsed4 = true;

  form: FormGroup;

  constructor(private fb: FormBuilder) {

  }

  buildForm() {
    this.form = this.fb.group({
      lines: this.fb.array([]),
      squares: this.fb.array([]),
      points: this.fb.array([]),
      polygons: this.fb.array([]),
    });
  }

  addLineForm(){

  }

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

  openPreviewModal() {
    this.previewModal.open();
  }

  ngOnInit() {
    this.buildForm()
  }

  checkForm(){
    console.log(this.lines)
  }

}
