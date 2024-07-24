import * as L from 'leaflet';

export interface IToolbarCollection {
  name: string;
  title: string;
  className: string;
  actions: () => (L.PM.ACTION_NAMES | L.PM.Action)[]
}
