import { FrequencyEnum } from "../enum/frequency-enum";
import { PaymentMethodEnum } from "../enum/payment-method";
import { SaleTypeEnum } from "../enum/sale-type.enums";
import { Article } from "./article.interface";
import { Item } from "./item.interface";
import { Payment } from "./payment.interface";

export interface Sale {
  saleId: string;
  total: number;
  createdAt: Date;
  type: SaleTypeEnum;
  articles: Article[];
  clientId: string;
  vendorId: string;
  status: string
  items?: Item[];
  payments: Payment[];
  advance: number;
  scheduledPayments: ScheduledPayments[];
  frequencyPayment: FrequencyEnum;
  paymentMethod: PaymentMethodEnum;
  paymentsNumber: number;
  debt: number;
}

export interface ScheduledPayments {
  dateToPay: Date;
  quantity: number;
}