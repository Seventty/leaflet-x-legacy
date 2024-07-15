import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import "@geoman-io/leaflet-geoman-free";
import { ModalComponent } from '../../shared/modal/modal.component';
import { IModalConfig } from '../../shared/modal/IModalConfig';
import { IModalOption } from '../../shared/modal/IModalOptions';

import { IBaseLayer } from '../../shared/interfaces/IBaseLayer';
import { ToastService } from '../../shared/services/toast/toast.service';
import { FileManagerService } from '../../shared/services/file-manager/file-manager.service';
import { Watermark } from '../../shared/utils/watermark.control';
import { GeoJsonResult } from '../../shared/types/geoJsonResult.type';
import { v4 as uuidv4 } from 'uuid';
import { HexColorType } from '../../shared/types/hexColor.type';
import { IStylizeDraw } from '../../shared/interfaces/IStylizeDraw';
import { UpdateAlertService } from '../../shared/services/updater-alert/update-alert.service';
import { ILegendBar } from '../../shared/interfaces/ILegendBar';

@Component({
  selector: 'leaflet-x-legacy',
  templateUrl: './leaflet-x-legacy.component.html',
  styleUrls: ['./leaflet-x-legacy.component.scss'],
})
export class LeafletXLegacyComponent implements AfterViewInit {
  /* Properties section */
  public mapId: string = 'map';
  private map?: L.Map;
  private featureGroup?: L.FeatureGroup;
  private defaultMaxZoom: number = 18
  private defaultMinZoom: number = 3

  /* Viewchild section */
  @ViewChild("fileManagerModal") fileManagerModal?: ModalComponent
  @ViewChild("fileExportModal") fileExportModal?: ModalComponent
  @ViewChild("manualEntrieModal") manualEntrieModal?: ModalComponent

  /* Decorators section */
  @Input() defaultInitMapCoords: L.LatLngExpression = [39.8282, -98.5795] // Dominican Republic coords default lat 19.026319 | default lang -70.147792
  @Input() defaultZoomLevel: number = 5; // Dominican Republic zoom: 8
  @Input() prefix: string = 'Thank you for using <a href="https://www.npmjs.com/package/@seventty/leaflet-x-legacy">LeafletX</a>, give me a ⭐ in <a href="https://github.com/Seventty/leaflet-angular-base">Github</a>';
  @Input() watermarkImagePath: string = '';
  @Input() featureCollectionInput?: GeoJsonResult | Array<GeoJsonResult>;
  @Input() readonly: boolean = false;
  @Input() mainColor: HexColorType = '#00b8e6';
  @Input() portraitMode: boolean = false;
  @Input() mapLegendBarData: Array<ILegendBar> = [];
  @Output() featureCollectionOutput: EventEmitter<GeoJsonResult> = new EventEmitter<GeoJsonResult>()

  featureCollection: GeoJsonResult = {
    type: 'FeatureCollection',
    features: []
  };

  /**
  * Configuration for the file uploader modal.
  * @type {IModalConfig}
  */
  fileManagerModalConfig: IModalConfig = {
    modalTitle: 'Importar Archivo/s',
    dashboardHeader: true,
  }

  /**
  * Options for file uploader the modal.
  * @type {IModalOption}
  */
  fileManagerModalOption: IModalOption = {
    centered: true,
    size: 'md',
  }

  /**
  * Configuration for the file uploader modal.
  * @type {IModalConfig}
  */
  fileExportModalConfig: IModalConfig = {
    modalTitle: 'Exportar Archivo',
    dashboardHeader: true,
  }

  /**
  * Options for file uploader the modal.
  * @type {IModalOption}
  */
  fileExportModalOption: IModalOption = {
    centered: true,
    size: 'md',
  }

  /**
  * Configuration for the manual entries modal.
  * @type {IModalConfig}
  */
  manualEntrieModalConfig: IModalConfig = {
    modalTitle: 'Entrada Manual',
    dashboardHeader: true,
  }

  /**
  * Options for manual entries the modal.
  * @type {IModalOption}
  */
  manualEntrieModalOption: IModalOption = {
    centered: true,
    size: 'xl',
  }

  /**
  * Initializes the map.
  * @private
  * @returns {void}
  */
  private initMap(): void {
    this.map = L.map(this.mapId, {
      center: this.defaultInitMapCoords,
      zoom: this.defaultZoomLevel,
      zoomControl: false,
    });
  }

  /**
  * Sets up the feature group.
  * @private
  * @returns {void}
  */
  private setFeatureGroup() {
    this.featureGroup = new L.FeatureGroup();
    this.map?.addLayer(this.featureGroup)
  }

  /**
  * Switches the base layer of the map.
  * @private
  * @returns {void}
  */
  private switchBaseLayer(): void {
    /* All free BaseLayer available > https://leaflet-extras.github.io/leaflet-providers/preview/ */

    const baseLayers: IBaseLayer = {
      "Default": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
      "Outdoor": L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'),
      "Satellite": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'),
      "light": L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'),
      "Dark": L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'),
    }

    if (this.map) {
      if (!this.portraitMode) L.control.layers(baseLayers).addTo(this.map);
      const defaultBaseLayerProvider: string = localStorage.getItem('layerMapProvider') || "Default";
      const defaultBaseLayer = baseLayers[defaultBaseLayerProvider]
      if (defaultBaseLayer) {
        defaultBaseLayer.addTo(this.map);
      }
      this.map.on('baselayerchange', (event: any) => {
        localStorage.setItem('layerMapProvider', event.name)
      });
    }
  }

  /**
  * Sets up Geoman controllers for the map.
  * @private
  * @returns {void}
  */
  private geomanControllers() {
    if (this.map) {
      this.map.attributionControl.setPrefix(this.prefix);

      L.control.zoom({
        position: "topright",
        zoomInTitle: 'Acercar',
        zoomOutTitle: 'Alejar'
      }).addTo(this.map);

      if (!this.readonly) {
        this.map.pm.addControls({
          position: 'topright',
          drawCircle: false,
          drawCircleMarker: false,
          drawText: false,
          drawMarker: false,
          cutPolygon: true,
          editControls: true,
        });

        this.map.pm.setLang('es');

        this.map.on('pm:create', (e: any) => {
          this.featureGroup?.addLayer(e.layer);
        });

        const newMarker: any = this.map.pm.Toolbar.copyDrawControl('drawMarker', { name: "newMarker" })
        newMarker.drawInstance.setOptions({ markerStyle: { icon: this.iconMarker(this.mainColor) } });
        this.map.pm.setPathOptions({
          color: this.mainColor,
          fillColor: this.mainColor,
          fillOpacity: 0.4,
        });

      } else {
        this.map.pm.addControls({
          position: 'topright',
          customControls: true,
          drawMarker: false,
          drawPolygon: false,
          drawPolyline: false,
          drawRectangle: false,
          drawCircle: false,
          drawCircleMarker: false,
          cutPolygon: false,
          editControls: false,
          drawText: false,
        })
      }
    }
  }

  /**
  * Paint the imported or input shapes
  * @private
  * @returns {IStylizeDraw}
  */
  private stylizeDraw(drawColor: HexColorType): IStylizeDraw {
    const colorConfigurator: IStylizeDraw = {
      fillColor: drawColor,
      weight: 3,
      color: drawColor,
      fillOpacity: 0.4
    }

    this.iconMarker(drawColor);
    return colorConfigurator;
  }

  /**
  * Configures a custom toolbar for the map.
  * @private
  * @returns {void}
  */
  private customToolbar() {
    const importButton = {
      text: "Importar archivo/s",
      onClick: () => {
        this.fileManagerModal?.open();
      },
    }

    const exportButton = {
      text: "Exportar archivo/s",
      onClick: () => {
        this.featureCollectionUpdate()
        if (this.featureCollection.features.length === 0) {
          this.toastService.errorToast("Mapa vacio", "No hay dibujos para exportar.");
          return;
        }
        this.fileExportModal?.open();
      },
    }

    const manualEntrieButton = {
      text: "Entrada manual",
      onClick: () => {
        this.manualEntrieModal?.open();
      },
    }

    const customToolbarActions: any = [
      ...(!this.readonly ? [importButton, manualEntrieButton] : []),
      exportButton,
      "cancel",
    ];

    if (this.map) {
      this.map.pm.Toolbar.createCustomControl({
        name: "import",
        title: "Cargar GeoJSON",
        className: 'upload-map',
        actions: customToolbarActions
      });
    }
  }

  /**
  * Creates a custom icon for marker.
  * @private
  * @param {string} color - Color of the marker.
  * @returns {L.DivIcon} - Leaflet DivIcon object.
  */
  private iconMarker(color: string): L.DivIcon {
    const markerHtmlStyles = `
    background: ${color};
    width: 30px;
    height: 30px;
    border-radius: 50% 50% 50% 0;
    border: 1px solid #fff;
    position: absolute;
    transform: rotate(-45deg);
    left: 50%;
    top: 50%;
    margin: -15px 0 0 -15px;`;

    const icon = L.divIcon({
      className: "my-custom-pin",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
      html: `<span style="${markerHtmlStyles}"/>`
    });

    L.Marker.prototype.options.icon = icon;

    return icon;
  }

  /**
  * Configures watermark on the map.
  * @private
  * @returns {void}
  */
  private watermarkConfigurator() {
    const watermark = new Watermark(this.watermarkImagePath, { position: 'bottomleft' });
    if (this.map) watermark.addTo(this.map);
  }

  /**
  * Fetches feature collection from file.
  * @private
  * @returns {void}
  */
  private getFeatureCollectionFromFile() {
    this.fileManagerService.getFileFeatureCollection().subscribe((res: GeoJsonResult) => {
      if (res.features.length > 0) {
        this.renderFeatureCollectionToMap(res);
        this.toastService.successToast("Éxito", "Figuras cargadas al mapa con éxito.");
      }
    })
  }

  /**
  * Renders feature collection on the map.
  * @private
  * @param {GeoJsonResult} featureCollection - Feature collection to render.
  * @returns {void}
  */
  private renderFeatureCollectionToMap(featureCollection: GeoJsonResult | Array<GeoJsonResult>) {
    if (this.map) {

      if (Array.isArray(featureCollection)) {
        featureCollection.forEach(collection => {
          if (collection.features.length !== 0) {
            const featureCollectionColor = collection.hasOwnProperty("featureCollectionColor") ? collection.featureCollectionColor : this.mainColor
            const geojsonToMap = L.geoJSON(collection, { style: this.stylizeDraw(featureCollectionColor) }).addTo(this.map);
            this.SetBounds(geojsonToMap);
            if (featureCollection.hasOwnProperty("featureCollectionPopup")) {
              geojsonToMap.bindPopup(collection.featureCollectionPopup);
            }
            this.featureCollectionUpdate();
          }
        });
      } else {
        if (featureCollection.features.length !== 0) {
          const featureCollectionColor = featureCollection.hasOwnProperty("featureCollectionColor") ? featureCollection.featureCollectionColor : this.mainColor
          const geojsonToMap = L.geoJSON(featureCollection, { style: this.stylizeDraw(featureCollectionColor) }).addTo(this.map);
          this.SetBounds(geojsonToMap);
          if (featureCollection.hasOwnProperty("featureCollectionPopup")) {
            geojsonToMap.bindPopup(featureCollection.featureCollectionPopup);
          }
          this.featureCollectionUpdate();
        }
      }
    }
  }

  private SetBounds(geojsonToMap) {
    this.map.fitBounds(geojsonToMap.getBounds());
  }

  /**
  * Exports GeoJSON from the map.
  * @private
  * @returns {void}
  */
  public featureCollectionUpdate(): void {
    const geojson: GeoJsonResult = {
      type: 'FeatureCollection',
      features: []
    };

    if (this.map) {
      const geomanLayers = this.map.pm.getGeomanLayers();
      geomanLayers.forEach((layer: any) => {
        const layerGeoJSON = layer.toGeoJSON();
        geojson.features.push(layerGeoJSON);
      });

      if (!Array.isArray(this.featureCollectionInput)) {
        this.featureCollection = {
          ...geojson,
          featureCollectionColor: this.featureCollectionInput?.featureCollectionColor,
          featureCollectionPopup: this.featureCollectionInput?.featureCollectionPopup
        }
      }

      this.featureCollectionOutput.emit(this.featureCollection);
    }
  }

  /**
  * Draw the incomming Feature Collection from Input into map
  * @private
  * @returns {void}
  */
  private drawInputFeatureCollectionIntoMap() {
    if (!this.featureCollectionInput) return;
    this.renderFeatureCollectionToMap(this.featureCollectionInput)
  }

  public mapIdGenerator() {
    this.mapId = uuidv4();
  }

  /* public getMapGeoJson() {
    this.exportGeoJson();
  } */

  private mapEventsHandler() {
    // Handle events to update the FeatureCollection
    if (this.map) {
      this.map.on('pm:create pm:edit pm:remove pm:cut pm:rotateend pm:globaldragmodetoggled pm:globaleditmodetoggled', (e) => {
        this.featureCollectionUpdate()
      });
    }
  }

  private portraitMapConfigurator() {
    this.map.attributionControl.setPrefix("");
    this.map.doubleClickZoom.disable();
    this.map.touchZoom.disable();
    this.map.dragging.disable();
    this.map.scrollWheelZoom.disable();
  }

  public manualEntriesUpdate(featureCollection: GeoJsonResult) {
    this.clearMap();
    this.renderFeatureCollectionToMap(featureCollection)
  }

  private clearMap(): void {
    try {
      this.map.eachLayer((layer) => {
        if (!(layer instanceof L.TileLayer)) {
          this.map.removeLayer(layer);
        }
      });
    } catch (error) {

    }
  }

  constructor(private fileManagerService: FileManagerService, private toastService: ToastService, private cdr: ChangeDetectorRef, private updateService: UpdateAlertService) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.setFeatureGroup();
    if (!this.portraitMode) {
      this.geomanControllers();
      this.customToolbar();
      this.watermarkConfigurator();
    } else {
      this.portraitMapConfigurator();
    }
    this.switchBaseLayer();
    this.getFeatureCollectionFromFile();
    this.drawInputFeatureCollectionIntoMap();
    this.mapEventsHandler();
    this.cdr.detectChanges();

    this.updateService.checkVersion();
  }

  ngOnInit(): void {
    this.mapIdGenerator();
  }
}
