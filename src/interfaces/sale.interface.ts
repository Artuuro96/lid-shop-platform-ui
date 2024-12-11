import { FrequencyEnum } from "../enum/frequency-enum";
import { SaleTypeEnum } from "../enum/sale-type.enums";
import { Item } from "./item.interface";
import { Payment } from "./payment.interface";

export interface Sale {
  saleId: string;
  total: number;
  createdAt: Date;
  type: SaleTypeEnum;
  articles: [];
  client: string;
  vendor: string;
  status: string
  items?: Item[];
  payments: Payment[];
  advance: number;
  scheduledPayments: ScheduledPayments[];
  frequencyPayment: FrequencyEnum;
  paymentsNumber: number;
  debt: number;
}

export interface ScheduledPayments {
  dateToPay: Date;
  quantity: number;
}