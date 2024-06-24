import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'lines-form-component',
  templateUrl: './lines-form.component.html',
  styleUrls: ['./lines-form.component.sass']
})
export class LinesFormComponent implements OnInit {
  linesForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {
    this.linesForm = this.fb.group({
      lines: this.fb.array([])
    });
  }

  ngOnInit() {
  }

  newLine(): FormGroup {
    return this.fb.group({
      expanded: false,
      vertices: this.fb.array([])
    });
  }

  newVertice(): FormGroup {
    return this.fb.group({
      expanded: false,
      longitud: [null, Validators.required],
      latitud: [null, Validators.required]
    })
  }

  get lines() {
    return this.linesForm.get('lines') as FormArray;
  }

  addLine() {
    this.lines.push(this.newLine());
  }

  toggleExpandLine(index: number) {
    const linea = this.lines.at(index);
    linea.get('expanded')?.setValue(!linea.get('expanded')?.value);
  }

  deleteLine(index: number) {
    this.lines.removeAt(index);
  }


  addVertice(lineaIndex: number) {
    const vertices = this.lines.at(lineaIndex).get('vertices') as FormArray;
    vertices.push(this.newVertice());
  }

  eliminarVertice(lineaIndex: number, verticeIndex: number) {
    const vertices = this.lines.at(lineaIndex).get('vertices') as FormArray;
    vertices.removeAt(verticeIndex);
  }

  toggleExpandVertice(lineaIndex: number, verticeIndex: number) {
    const vertices = this.lines.at(lineaIndex).get('vertices') as FormArray;
    const vertice = vertices.at(verticeIndex);
    vertice.get('expanded')?.setValue(!vertice.get('expanded')?.value);
  }

  getVertices(lineaIndex: number): FormArray {
    return this.lines.at(lineaIndex).get('vertices') as FormArray;
  }

  get getLinesForm(){
    return this.linesForm;
  }

  convertToGeoJson() {
    const features = this.lines.controls.map(line => {
      const vertices = line.get('vertices') as FormArray;
      const coordinates = vertices.controls.map(vertex => [
        parseFloat(vertex.get('longitud')?.value),
        parseFloat(vertex.get('latitud')?.value)
      ]);
      return {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: coordinates
        }
      };
    });

    return {
      type: 'FeatureCollection',
      features
    };
  }

}
