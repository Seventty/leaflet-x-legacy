import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as topojson from "topojson-client";
import * as toGeoJson from "@tmcw/togeojson";
import { ToastService } from '../toast/toast.service';
import { GeoJsonResult } from '../../types/geoJsonResult.type';
import { GeoJsonNormalize } from '../../utils/geoJsonNormalize';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {
  private $featureCollection = new BehaviorSubject<GeoJsonResult>({
    type: "FeatureCollection",
    features: []
  });

  constructor(private toastService: ToastService) { }

  public getFileFeatureCollection(): Observable<GeoJsonResult>{
    return this.$featureCollection.asObservable()
  }

  public setFeatureCollection(geojsonResult: GeoJsonResult){
    this.$featureCollection.next(geojsonResult)
  }

  public sendFilesUploaded(files: Array<File>) {
    if (!files?.length) {
      this.toastService.errorToast('Sin archivos', 'Debe seleccionar al menos un archivo compatible.');
      return;
    }

    this.readAsText(files)
  }

  private readAsText(files: Array<File>) {
    files.forEach((file: File) => {
      const fileType = this.detectType(file)
      if (!fileType) {
        this.toastService.errorToast('Formato no soportado', `El archivo "${file.name}" no tiene un formato compatible.`);
        return;
      }

      const reader: FileReader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const textResult = e.target?.result as string;
        this.readFile(fileType, textResult)
      };
      reader.readAsText(file);
    });
  }

  private readFile(fileType: string, content: string) {
    let featureCollection: GeoJsonResult | null = null;

    switch (fileType) {
      case "kml":
        featureCollection = this.kmlHandler(content);
        break;
      case "gpx":
        featureCollection = this.gpxHandler(content);
        break;
      case "geojson":
        featureCollection = this.geoJsonHandler(content);
        break;
      default:
        this.toastService.errorToast('Formato no soportado', 'Este formato todavía no tiene un importador implementado.');
        return;
    }

    const normalizedFeatureCollection = this.normalizeFeatureCollection(featureCollection);
    if (!normalizedFeatureCollection) {
      this.toastService.errorToast('Archivo inválido', 'No se pudo convertir el archivo a GeoJSON válido.');
      return;
    }

    this.setFeatureCollection(normalizedFeatureCollection);
  }

  private normalizeFeatureCollection(geoJson: GeoJsonResult | null): GeoJsonResult | null {
    const normalizer: GeoJsonNormalize = new GeoJsonNormalize;
    return normalizer.normalize(geoJson) as GeoJsonResult | null;
  }

  private detectType(file: File): string {
    const filename: string = file.name ? file.name.toLowerCase() : '';
    const fileExtension = (extension: string) => filename.endsWith(extension);

    if (file.type === 'application/vnd.google-earth.kml+xml' || fileExtension('.kml')) return 'kml';
    if (fileExtension('.gpx')) return 'gpx';
    if (fileExtension('.geojson') || fileExtension('.json') || fileExtension('.topojson')) return 'geojson';

    return '';
  }


  private kmlHandler(content: string): GeoJsonResult | null {
    const kmlDom = this.toDom(content)
    if (!kmlDom) return null;
    if (kmlDom.getElementsByTagName('NetworkLink').length) this.toastService.warningToast("¡Advertencia!", "El archivo KML que subiste incluía NetworkLinks: es posible que parte del contenido no se muestre. Exporte y cargue KML sin NetworkLinks para obtener un rendimiento óptimo");
    return toGeoJson.kml(kmlDom)
  }

  private gpxHandler(content: string): GeoJsonResult | null {
    const gpxDom = this.toDom(content);
    if (!gpxDom) return null;

    return toGeoJson.gpx(gpxDom);
  }

  private geoJsonHandler(content: string): GeoJsonResult | null {
    try {
      const geoJsonResult = JSON.parse(content);
      if (geoJsonResult && geoJsonResult.type === 'Topology' && geoJsonResult) {
        const collection: GeoJsonResult = {
          type: 'FeatureCollection',
          features: []
        };
        for (const objName in geoJsonResult.objects) {
          const obj = geoJsonResult.objects[objName];
          const ft: GeoJsonResult | any = topojson.feature(geoJsonResult, obj);
          if (ft.features) {
            collection.features = collection.features.concat(ft.features);
          }
        }
        return collection;
      } else {
        return geoJsonResult;
      }
    } catch (error) {
      this.toastService.errorToast("Error", "Archivo JSON inválido");
      return null;
    }
  }

  private toDom(e: string): Document | null {
    const xmlDom = new DOMParser().parseFromString(e, 'text/xml');
    if (xmlDom.getElementsByTagName('parsererror').length > 0) {
      return null;
    }

    return xmlDom;
  }

}
