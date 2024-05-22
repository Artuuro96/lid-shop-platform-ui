import { StatusEnum } from "../enum/status.enum";

export interface Article {
  itemCode: string;
  item: string;
  ticketPrice: number;
  tax: number;
  parcel: number;
  otherCosts: number;
  profit: number;
  lidShopPrice: number;
  status: StatusEnum;
  brand: string;
}