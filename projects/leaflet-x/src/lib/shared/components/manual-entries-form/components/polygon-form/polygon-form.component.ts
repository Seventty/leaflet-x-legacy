import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'polygon-form',
  templateUrl: './polygon-form.component.html',
  styleUrls: ['./polygon-form.component.sass']
})
export class PolygonFormComponent implements OnInit {
  polygonsForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {
    this.polygonsForm = this.fb.group({
      polygons: this.fb.array([])
    });
  }

  ngOnInit() {
  }

  newPolygon(): FormGroup {
    return this.fb.group({
      expanded: false,
      vertices: this.fb.array([])
    });
  }

  newVertex(): FormGroup {
    return this.fb.group({
      expanded: false,
      longitude: [null, Validators.required],
      latitude: [null, Validators.required]
    });
  }

  get polygons() {
    return this.polygonsForm.get('polygons') as FormArray;
  }

  addPolygon() {
    this.polygons.push(this.newPolygon());
  }

  toggleExpandPolygon(index: number) {
    const polygon = this.polygons.at(index);
    polygon.get('expanded')?.setValue(!polygon.get('expanded')?.value);
  }

  deletePolygon(index: number) {
    this.polygons.removeAt(index);
  }

  addVertex(polygonIndex: number) {
    const vertices = this.polygons.at(polygonIndex).get('vertices') as FormArray;
    vertices.push(this.newVertex());
  }

  get getPolygonForm(){
    return this.polygonsForm;
  }

  deleteVertex(polygonIndex: number, vertexIndex: number) {
    const vertices = this.polygons.at(polygonIndex).get('vertices') as FormArray;
    vertices.removeAt(vertexIndex);
  }

  toggleExpandVertex(polygonIndex: number, vertexIndex: number) {
    const vertices = this.polygons.at(polygonIndex).get('vertices') as FormArray;
    const vertex = vertices.at(vertexIndex);
    vertex.get('expanded')?.setValue(!vertex.get('expanded')?.value);
  }

  getVertices(polygonIndex: number): FormArray {
    return this.polygons.at(polygonIndex).get('vertices') as FormArray;
  }

  closePolygon(polygonIndex: number) {
    const vertices = this.getVertices(polygonIndex);
    if (vertices.length > 0) {
      const firstVertex = vertices.at(0).value;
      vertices.push(this.fb.group({
        expanded: false,
        longitude: [firstVertex.longitude, Validators.required],
        latitude: [firstVertex.latitude, Validators.required]
      }));
    }
  }

  convertToGeoJson() {
    const features = this.polygons.controls.map(polygon => {
      const vertices = polygon.get('vertices') as FormArray;
      const coordinates = vertices.controls.map(vertex => [
        parseFloat(vertex.get('longitude')?.value),
        parseFloat(vertex.get('latitude')?.value)
      ]);

      // Ensure the polygon is closed by repeating the first vertex at the end
      if (coordinates.length > 0 &&
          (coordinates[0][0] !== coordinates[coordinates.length - 1][0] ||
           coordinates[0][1] !== coordinates[coordinates.length - 1][1])) {
        coordinates.push([...coordinates[0]]);
      }

      return {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [coordinates]
        }
      };
    });

    return {
      type: 'FeatureCollection',
      features
    };
  }
}
