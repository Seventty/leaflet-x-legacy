import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LeafletXLegacyService {
  private markerClusterGroup: L.MarkerClusterGroup;

  constructor(private ngxSpinnerService: NgxSpinnerService) {
    this.markerClusterGroup = L.markerClusterGroup({
      disableClusteringAtZoom: 13,
      chunkedLoading: true,
      chunkDelay: 50,
      chunkProgress: this.updateProgressBar.bind(this),
    });
  }

  addLayer(layer: L.Layer): void {
    this.ngxSpinnerService.show();
    this.markerClusterGroup.addLayer(layer);
  }

  get getClusterGroup(){
    return this.markerClusterGroup;
  }

  private updateProgressBar(processed: number, total: number, elapsed: number) {
    if (elapsed > 1000) {
      this.ngxSpinnerService.show();
    }
    if (processed === total) {
      this.ngxSpinnerService.hide();
    }
  }


}
