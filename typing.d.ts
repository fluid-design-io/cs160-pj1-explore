export interface Park {
  id: string;
  name: string;
  description: string;
  location: string;
  address: string;
  distanceTo: number;
  type: string;
  elevation: number[];
  coords: {
    latitude: number;
    longitude: number;
  };
  info: ParkInfo;
  features: ParkFeatures;
  weather: ParkWeather[];
  images: string[];
}

export interface ParkInfo {
  operation: string;
  hours: string;
  ratings: number;
  difficulty: string;
  distance: number;
  /**
   * duration is in minutes
   */
  duration: number;
}

export interface ParkFeatures {
  accessibility: boolean;
  parking: boolean;
  wifi: boolean;
  drinkingWater: boolean;
  dogFriendly: boolean;
  restrooms: boolean;
}

export interface ParkWeather {
  hour: string;
  temperature: number;
  cast: "sunny" | "cloudy" | "rainy" | "snowy";
  wind: number;
  rain: number;
}
