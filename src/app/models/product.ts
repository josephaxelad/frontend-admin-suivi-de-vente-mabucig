import { CodeQr } from "./code-qr";
import { Mark } from "./mark";
import QRCodeStyling from 'qr-code-styling';

export interface Product {
  _id? : string;
  sku : string;
  price : number;
  numberByPack : number;
  picture? : string;
  mark? : Mark;
  //codeQr? : CodeQr;
  codeQr? : QRCodeStyling;
  isDisabled? : boolean;
  isDeleted? : boolean;
  cartridge? : number;

  idCodeQr? : string;
  idMark? : string;
}
