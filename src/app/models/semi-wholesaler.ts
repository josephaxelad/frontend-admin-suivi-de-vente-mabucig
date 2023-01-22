import { Address } from "./address";
import { Wholesaler } from "./wholesaler";

export interface SemiWholesaler {
  _id? : string;
  wholesaler? : Wholesaler;
  idAccount : string;
  name : string;
  phone1? : string;
  phone2? : string;
  picture? : string;
  address : Address;
  isDisabled? : boolean;
  isDeleted? : boolean;

  idWholesaler :string;
  idAddress? : string;
}
