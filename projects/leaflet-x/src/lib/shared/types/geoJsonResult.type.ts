import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson'
import { HexColorType } from './hexColor.type';

export interface ExtendedFeatureCollection<G extends Geometry | null = Geometry, P = GeoJsonProperties> extends FeatureCollection<G, P> {
  featureCollectionColor?: HexColorType;
}

export type GeoJsonResult = ExtendedFeatureCollection<Geometry | null, GeoJsonProperties>;
