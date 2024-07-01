import { StatusEnum } from "../enum/status.enum";

export interface Article {
  _id: string;
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

export interface DeletedArticleIds {
  deletedIds: string[];
}

export interface Data {
  _id: string;
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