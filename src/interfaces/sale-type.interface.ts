import { SaleTypeEnum } from "../enum/sale-type.enums";

export interface SaleType {
  id: number,
  name: string,
  type: SaleTypeEnum,
}