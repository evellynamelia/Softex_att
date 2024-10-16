export interface WeatherData {
    name: string;
    sys: { country: string };
    main: { temp: number; temp_min: number; humidity: number };
    weather: { description: string; icon: string }[];
    wind: { speed: number };
    visibility: number;
    dt: number;
    coord: { lat: number; lon: number };
  }
  
  export interface ForecastEntry {
    dt: number;
    main: { temp_min: number; temp_max: number };
  }
  
  export interface ForecastData {
    list: ForecastEntry[];
  }
  