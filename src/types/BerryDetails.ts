export interface BerryDetails {
  id: number;
  name: string;
  firmness: {
    name: string;
    url: string;
  };
  flavors: {
    flavor: {
      name: string;
      url: string;
    };
    potency: number;
  }[];
  growth_time: number;
  item: {
    name: string;
    url: string;
  };
  max_harvest: number;
  natural_gift_power: number;
  natural_gift_type: {
    name: string;
    url: string;
  };
  size: number;
  smoothness: number;
  soil_dryness: number;
}
