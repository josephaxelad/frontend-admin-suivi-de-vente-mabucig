import { Product } from "./product";

export interface CommandLine {
  _id? : string;
  qty : number;
  price : number;
  product : Product;
  productName : string;
  idProduct? : string;

}
