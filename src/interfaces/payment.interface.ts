export interface Payment {
  id: string,
  number: number,
  quantity: number,
  createdAt: Date,
  receivedBy: string,
  status: string,
}