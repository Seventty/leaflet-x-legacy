import { Component, Input, OnChanges, ChangeDetectorRef, SimpleChanges } from '@angular/core';

@Component({
  selector: 'fileFormat',
  templateUrl: './fileFormat.component.html',
})
export class FileFormatComponent implements OnChanges {
  @Input() optionSelected: string = "";
  fileFormats: { key: string, value: string }[] = [];

   fileFormatList = {
    geoarchivos: [
      { key: "geojson", value: "Formato basado en JSON que almacena datos geoespaciales, incluyendo geometría y atributos, ampliamente utilizado en aplicaciones web." },
      { key: "topojson", value: "Extensión de GeoJSON que almacena datos geoespaciales de manera topológica, reduciendo el tamaño del archivo mediante la eliminación de redundancias." },
      { key: "json", value: "Formato de intercambio de datos estructurados basado en texto, que en algunos casos puede contener información geoespacial." },
      { key: "gpkg", value: "Formato de base de datos geoespacial SQLite conocido como GeoPackage, que almacena datos ráster y vectoriales en un solo archivo." },
      { key: "kml", value: "Formato basado en XML desarrollado por Google para almacenar datos espaciales y visualizarse en Google Earth y Google Maps." }
    ],
    shapefiles: [
      { key: "shp", value: "Archivo principal de un shapefile que almacena la geometría de los elementos espaciales como puntos, líneas o polígonos." },
      { key: "shx", value: "Archivo índice del shapefile que permite un acceso más rápido a la geometría contenida en el archivo .shp." },
      { key: "cpg", value: "Define la codificación de caracteres utilizada en el archivo .dbf, asegurando que los caracteres especiales se interpreten correctamente." },
      { key: "dbf", value: "Archivo de base de datos en formato dBASE que almacena los atributos de los elementos espaciales en un shapefile." },
      { key: "prj", value: "Archivo que contiene información sobre el sistema de coordenadas y proyección utilizada en un shapefile." },
    ]
  };


  constructor(private cdr: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.optionSelected && changes.optionSelected.currentValue) {
      this.fileFormats = this.fileFormatList[this.optionSelected] || [];
      this.cdr.detectChanges();
    }
  }
}
