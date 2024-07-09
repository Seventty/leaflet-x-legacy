import { Injectable, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { GeoJsonResult } from '../../types/geoJsonResult.type';
import { LatitudValidator, LongitudeValidator } from './coordinates.validator';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormValue, Point } from '../../interfaces/form-value.interfaces';
import { FeatureGroup } from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  protected form: FormGroup;
  private subject = new BehaviorSubject<GeoJsonResult>(null);
  public valueChange: Observable<GeoJsonResult> = this.subject.asObservable();

  constructor(private formBuilder: FormBuilder) { }

  //#region get
  public get Points(): FormArray {
    return this.form.get('point') as FormArray;
  }

  public get LineString(): FormArray {
    return this.form.get('lineString') as FormArray;
  }

  public get Polygon(): FormArray {
    return this.form.get('polygon') as FormArray;
  }
  //#endregion

  public addLineString(): void {
    this.LineString.push(this.formArrayBuild());
  }

  public addPolygon(): void {
    this.Polygon.push(this.formArrayBuild());
  }

  public addPoint(): void {
    this.Points.push(this.formBuild());
  }

  public addPointInLineString(index: number): void {
    let array = this.LineString.controls[index] as FormArray;
    array.push(this.formBuild());
  }

  public addPointInPolygon(index: number): void {
    let array = this.Polygon.controls[index] as FormArray;
    array.push(this.formBuild());
  }

  private coordinetesToFormGroup([long, lat]) {
    return this.formBuild(lat, long);
  }

  private formArrayBuild(points: FormGroup[] = []): FormArray {
    return this.formBuilder.array(points);
  }

  private formBuild(lat: Number = null, long: number = null): FormGroup {
    return this.formBuilder.group({
      lat: [lat, [Validators.required, LatitudValidator()]],
      long: [long, [Validators.required, LongitudeValidator()]],
    });
  }

  private formGroupToGeoJsonResult(): GeoJsonResult {
    let geojson = { type: 'FeatureCollection', features: [] } as GeoJsonResult;
    geojson.features.push(
      ...this.pointToFeature(),
      ...this.lineStringtToFeature(),
      ...this.polygonToFeature()
    );

    this.subject.next(geojson);

    return geojson;
  }

  private featureLinesToFormGroup(featureColletion: GeoJsonResult) {
    featureColletion?.features
      .filter(
        (feature) =>
          feature?.type == 'Feature' && feature.geometry?.type == 'LineString'
      )
      .forEach((line) => {
        let { geometry } = line as any; //TODO: Consulta por rai por que le tipo Geometry no tiene la propiedad coordinates

        let array: FormArray = this.formArrayBuild();
        geometry.coordinates.forEach((point) => {
          array.push(this.coordinetesToFormGroup(point));
        });

        this.LineString.push(array);
      });
  }

  private featurePointToFormGroup(featureColletion: GeoJsonResult) {
    featureColletion?.features
      .filter(
        (feature) =>
          feature?.type == 'Feature' && feature.geometry?.type == 'Point'
      )
      .forEach((point) => {
        let { geometry } = point as any; //TODO: Consulta por rai por que le tipo Geometry no tiene la propiedad coordinates
        this.Points.push(this.coordinetesToFormGroup(geometry.coordinates));
      });
  }

  private featurePolygonToFormGroup(featureColletion: GeoJsonResult) {
    featureColletion?.features
      .filter(
        (feature) =>
          feature?.type == 'Feature' && feature.geometry?.type == 'Polygon'
      )
      .forEach((line) => {
        let { geometry } = line as any; //TODO: Consulta por rai por que le tipo Geometry no tiene la propiedad coordinates

        let array: FormArray = this.formArrayBuild();
        let list: any[] = geometry.coordinates[0];


        list.forEach((point) => {
          array.push(this.coordinetesToFormGroup(point));
        });

        this.Polygon.push(array);
      });
  }

  private mainFormBuild() {
    this.form = this.formBuilder.group({
      point: this.formArrayBuild(),
      lineString: this.formArrayBuild(),
      polygon: this.formArrayBuild(),
    });
  }

  private lineStringtToFeature(): any[] {
    let array = [];
    this.LineString.controls //Obtener solo los formulario validos
      .filter((x) => x.valid)
      .forEach((x) => {
        array.push(x.value as Point);
      });

    let result = [];
    array.forEach((points) => {
      result.push(
        this.maperFeature(
          'LineString',
          points.map((value) => [value.long, value.lat])
        )
      );
    });

    return result;
  }

  private pointToFeature(): any[] {
    let points = [];
    this.Points.controls //Obtener solo los formulario validos
      .filter((x) => x.valid)
      .forEach((x) => {
        points.push(x.value as Point);
      });

    return points.map((value) =>
      this.maperFeature('Point', [value.long, value.lat])
    );
  }

  private polygonToFeature(): any[] {
    let array: Array<Point[]> = [];

    //Obtener solo los formulario validos
    this.Polygon.controls
      .filter((x) => x.valid)
      .forEach((x) => {
        array.push(x.value);
      });

    //Cerrar polígono, todos los polígonos deben terminar con el mismo punto que inician.
    array.forEach((points) => {
      let { lat, long } = points[0];
      points.push({ lat, long });
    });

    //Mapear los formgroup en un objecto de tipo Feature
    let result = [];
    array.forEach((points) => {
      result.push(
        this.maperFeature('Polygon', [
          points.map((value) => [value.long, value.lat]),
        ])
      );
    });

    return result;
  }

  /** Mapear las coordenas a un objecto de tipo Feature
   * @param type Tipo del objecto geometry.
   * @param coordinates Lista de coordenada.
   * @returns
   */
  private maperFeature(type: string, coordinates: any[]): any {
    return {
      type: 'Feature',
      properties: {},
      geometry: {
        coordinates,
        type,
      },
    };
  }

  public updateForm(featureColletion: GeoJsonResult | Array<GeoJsonResult>): void {
    if (!featureColletion) {
      return;
    }

    this.mainFormBuild();

    if (Array.isArray(featureColletion)) {
      featureColletion.forEach((feature) => {
        this.featureLinesToFormGroup(feature);
        this.featurePointToFormGroup(feature);
        this.featurePolygonToFormGroup(feature);
      });
    } else {
      this.featureLinesToFormGroup(featureColletion);
      this.featurePointToFormGroup(featureColletion);
      this.featurePolygonToFormGroup(featureColletion);
    }

    this.form.valueChanges.subscribe((e) => {
      this.formGroupToGeoJsonResult();
    });
  }

  public removePointAt(index: number, indexControl: number = null): void {
    if (indexControl === null) {
      this.Points.removeAt(index);
      return;
    }
  }

  public removeLineStringAt(
    indexLineString: number,
    indexPoint: number = null
  ): void {
    if (indexPoint === null) {
      this.LineString.removeAt(indexLineString);
      return;
    }

    let array = this.LineString.controls[indexPoint] as FormArray;
    array.removeAt(1);
  }

  public removePolygonAt(indexPolygon: number, indexPoint: number = 0): void {
    if (indexPoint === null) {
      this.Polygon.removeAt(indexPolygon);
    }

    let array = this.Polygon.controls[indexPolygon] as FormArray;
    array.removeAt(indexPoint);
  }
}
