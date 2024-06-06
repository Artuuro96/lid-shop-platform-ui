import { Item } from "./item.interface";
import { Payment } from "./payment.interface";

export interface SaleDetail {
  saleId: string;
  total: number;
  createdAt: Date;
  saleType: 'CONTADO' | 'CREDITO';
  client: string;
  vendor: string;
  status: string
  items: Item[];
  payments: Payment[]
}