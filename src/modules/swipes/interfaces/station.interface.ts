export interface Station {
  name: string;
  line: string;
  coords: {
    lat: number;
    lon: number;
  };
}
