import { StatusEnum } from "../enum/status.enum";

export interface Article {
  code: string;
  name: string;
  ticketPrice: number;
  tax: number;
  parcel: number;
  otherCosts: number;
  profit: number;
  lidShopPrice: number;
  status: StatusEnum;
  brandId: string;
}

export interface Data {
  code: string;
  name: string;
  ticketPrice: number;
  tax: number;
  parcel: number;
  otherCosts: number;
  profit: number;
  lidShopPrice: number;
  status: StatusEnum;
  brandId: string;
}