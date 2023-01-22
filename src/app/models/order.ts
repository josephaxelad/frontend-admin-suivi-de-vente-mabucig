import { CommandLine } from "./command-line";
import { Product } from "./product";
import { SemiWholesaler } from "./semi-wholesaler";
import { Wholesaler } from "./wholesaler";

export interface Order {
  _id? : string;
  date : Date;
  cart : CommandLine;
  price : number;
  wholesaler : Wholesaler;
  semiWholesaler : SemiWholesaler;
  sent : boolean;

  idWholesaler : string;
  idSemiWholesaler : string;

  qty? : number;
  product? : Product;
}
