import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';

@Injectable({
  providedIn: 'root'
})
export class LeafletXLegacyService {
  private markerClusterGroup: L.MarkerClusterGroup;

  constructor() {
    this.markerClusterGroup = L.markerClusterGroup({
      disableClusteringAtZoom: 13,
      chunkedLoading: true,
    });
  }

  addLayer(layer: L.Layer): void {
    this.markerClusterGroup.addLayer(layer);
  }

  public getClusterGroup(){
    return this.markerClusterGroup;
  }

}
