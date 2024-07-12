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
  /**Formulario principal */
  protected form: FormGroup;
  private subject = new BehaviorSubject<GeoJsonResult>(null);
  /**Emite los cambios realizado en el formulario*/
  public valueChange: Observable<GeoJsonResult> = this.subject.asObservable();
  collection: GeoJsonResult | GeoJsonResult[];

  constructor(private formBuilder: FormBuilder) {}

  public get Points(): FormArray {
    return this.form.get('point') as FormArray;
  }

  public get LineString(): FormArray {
    return this.form.get('lineString') as FormArray;
  }

  public get Polygon(): FormArray {
    return this.form.get('polygon') as FormArray;
  }

  /**Agrega un nuevo punto al `formArray` de  `Points`*/
  public addLineString(): void {
    this.LineString.push(this.formArrayBuild());
  }

  /**Agrega un nuevo polígono al `formArray` de  `Polygon`*/
  public addPolygon(): void {
    this.Polygon.push(this.formArrayBuild());
  }

  /**Agrega una nueva linea al `formArray` de  `LineString`*/
  public addPoint(): void {
    this.Points.push(this.formBuild());
  }

  /** Agrega un nuevo vértice al `formArray` en `index`.
   *
   * @param index Posición de la línea a agregar un nuevo vértice.
   */
  public addPointInLineString(index: number): void {
    let array = this.LineString.controls[index] as FormArray;
    array.push(this.formBuild());
  }

  /** Agrega un nuevo vértice al `formArray` en `index`.
   *
   * @param index Posición del polígono a agregar un nuevo vértice.
   */
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

    if (!Array.isArray(this.collection)) {
      if (this.collection.featureCollectionColor) {
        geojson.featureCollectionColor = this.collection?.featureCollectionColor;
      }
      if (this.collection.featureCollectionPopup) {
        geojson.featureCollectionPopup = this.collection?.featureCollectionPopup;
      }
      if (this.collection.bbox) {
        geojson.bbox = this.collection.bbox;
      }

      if (this.collection.type) {
        geojson.type = this.collection.type;
      }
    }

    geojson.features.push(
      ...this.pointToFeature(),
      ...this.lineStringtToFeature(),
      ...this.polygonToFeature()
    );

    if(this.form.valid){
      this.subject.next(geojson);
    }

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

        list.pop(); //Remover vertice de cierre.

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

  /**Mapea el `LineString: FormArray[]` a una lista de objectos Feature. */
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

  /**Mapea el `Points: FormArray[]` a una lista de objectos Feature. */
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

  /**Mapea el `Polygon: FormArray[]` a una lista de objectos Feature. */
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

  /** Actualiza el formulario en base a `featureColletion`
   * @param featureColletion Lista de `GeoJsonResult` o `Array<GeoJsonResult>`
   * @returns
   */
  public updateForm(
    featureColletion: GeoJsonResult | Array<GeoJsonResult>
  ): void {

    this.collection = featureColletion;

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

  /** Remover punto.
   *
   * @param index Índice del punto a remover.
   * @example removePointAt(2) //Se removerá el punto en la posicion 2
   */
  public removePointAt(index: number): void {
    this.Points.removeAt(index);
  }

  /** Remover linea o vértice de una linea.
   *
   * @param indexLineString Índice de la Linea a remover.
   *  * especifica la linea remover.
   * @param indexPoint  Índice del vértice a remover.
   *  * especifica el vértice de la linea `indexLineString` a remover. En caso de `indexPoint` ser  `null` se removerá la linea.
   *
   * @example removeLineStringAt(1,2) //Se removerá el vértice en la posición 2 de la linea en la posicion 1
   * @example removeLineStringAt(2) //Se removerá la linea en la posición 2
   */
  public removeLineStringAt(
    indexLineString: number,
    indexPoint: number = null
  ): void {
    if (indexPoint === null) {
      this.LineString.removeAt(indexLineString);
      return;
    }
    let array = this.LineString.at(indexLineString) as FormArray;
    array.removeAt(indexPoint);
  }

  /** Remover polígono o vértice de un polígono.
   *
   * @param indexPolygon Índice del polígono a remover.
   *  * especifica el polígono remover.
   * @param indexPoint  Índice del vértice a remover.
   *  * especifica el vértice del polígono `indexPolygon` a remover. En caso de `indexPoint` ser  `null` se removerá el polígono.
   *
   * @example removePolygonAt(1,2) //Se removerá el vértice en la posición 2 del polígono en la posicion 1
   * @example removePolygonAt(2) //Se removerá el polígono en la posición 2
   */
  public removePolygonAt(indexPolygon: number, indexPoint: number = null): void {
    if (indexPoint === null) {
      this.Polygon.removeAt(indexPolygon);
      return;
    }

    let array = this.Polygon.at(indexPolygon) as FormArray;
    array.removeAt(indexPoint);
  }
}
