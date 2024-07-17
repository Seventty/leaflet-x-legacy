export interface FormValue {
  point: Point[];
  lineString: Array<Point[]>;
  polygon: Array<Point[]>;
}

export interface Point {
  lat: number;
  long: number;
}
