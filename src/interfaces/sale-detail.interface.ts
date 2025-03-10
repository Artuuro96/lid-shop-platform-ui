import { Article } from "./article.interface";

export interface SaleDetail {
  _id: string;
  saleId: string;
  advance: number;
  articles: Article[];
  debt: number;
  paymentMethod: string;
  paymentsNumber: number;
  total: number;
  type: string;
  clientId: string;
  vendorId: string;
  scheduledPayments?: ScheduledPayments[];
  status: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  deletedAt: Date;
  deletedBy: string;
  deleted: boolean;
}

export interface ScheduledPayments {
  dateToPay: Date,
  quantity: number
}