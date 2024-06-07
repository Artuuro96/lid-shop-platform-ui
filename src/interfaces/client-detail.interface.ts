import { SaleDetail } from "./sale.interface";

export interface ClientDetail {
  name: string;
  lastName: string;
  age: number;
  email: string;
  points: number;
  address: string;
  cellphone: string;
  sales: SaleDetail[];
}