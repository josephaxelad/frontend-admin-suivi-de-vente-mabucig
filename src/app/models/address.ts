import { City } from "./city";

export interface Address {
  _id? : string;
  name : string;
  neighborhood : string;
  gpsLat? : Number;
  gpsLong? : Number;
  city? : City;
  idCity? : string;
}
