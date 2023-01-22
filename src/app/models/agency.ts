import { City } from "./city";

export interface Agency {
  _id? : string;
  code : string;
  city? : City;
  idCity? : string;
}
