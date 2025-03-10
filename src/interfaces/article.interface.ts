import { ArticleStatusEnum } from "../enum/status.enum";

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
  status: ArticleStatusEnum;
  brandId: string;
  url: string
}

export interface DeletedArticleIds {
  deletedIds: string[];
}