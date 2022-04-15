export interface City {
  continent: string;
  country: string;
  founded: string;
  landmarks: Array<string>;
  latitude: string;
  longitude: string;
  name: string;
  name_native: string;
  population: string;
}

export interface Cities {
  cities: Array<City>;
}