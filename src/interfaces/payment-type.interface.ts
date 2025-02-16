import { PaymentMethodEnum } from "../enum/payment-method";

export interface PaymentType {
  id: number,
  name: string,
  type: PaymentMethodEnum,
}