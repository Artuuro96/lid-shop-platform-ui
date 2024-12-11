import { SaleDetail } from "./sale-detail.interface";

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

export interface Client {
  _id: string;
  name: string;
  lastName: string;
  age: number;
  email: string;
  points: number;
  address: string;
  cellphone: string;
  inputValue?: string;
}