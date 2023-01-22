import { Group } from "./group";

export interface Company {
  _id? : string;
  name : string;
  group : Group;
  idGroup?: string;
}
