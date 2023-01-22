import { Agency } from "./agency";
import { City } from "./city";
import { Company } from "./company";
import { Group } from "./group";

export interface Wholesaler {
  _id?: string;
  idAccount: string;
  name: string;
  login: string;
  password?: string;
  phone: string;
  picture?: string;
  company: string;
  group? : Group;
  markets?: City[];
  agency?: Agency;
  isDisabled?: boolean;
  isDeleted?: boolean;

  idCompany?: string;
  idAgency?: string;
  idsMarket?: string[];
  idGroup? : string;
}
