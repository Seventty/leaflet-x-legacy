import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GeoJsonResult } from '../../../types/geoJsonResult.type';
import { FormService } from '../../../services/form/form.service';

@Component({
  selector: 'manual-form',
  templateUrl: './manual-form.component.html',
  styleUrls: ['./manual-form.component.sass'],
})
export class ManualFormComponent implements OnInit, OnChanges {
  //#region Input, OutPut
  @Input() featureCollection: GeoJsonResult | Array<GeoJsonResult>;
  @Output() updateFeatureCollection: EventEmitter<GeoJsonResult> = new EventEmitter<GeoJsonResult>();
  @Input() featureCollectionExtendedProps: any;

  //#endregion
  constructor(private FormService: FormService) {

  }

  selectedTab: string = 'tab1';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.featureCollection) {
      //console.log("Lo que viene en el changes featureCollection", changes.featureCollection)
      this.FormService.updateForm(this.featureCollection as GeoJsonResult);
    }
  }

  ngOnInit() {
    this.FormService.valueChange.subscribe(c => {
      // console.log(c);
      this.updateFeatureCollection.emit(c)
    });
  }
}
