import { ArticleStatusEnum } from "../enum/status.enum";

export interface Article {
  _id?: string;
  code: string;
  name: string;
  ticketPrice: string | number;
  tax: string | number;
  parcel: string | number;
  otherCosts: string | number;
  profit: string | number;
  lidShopPrice: string | number;
  status: ArticleStatusEnum;
  brandId: string;
  url?: string
}

export interface DeletedArticleIds {
  deletedIds: string[];
}