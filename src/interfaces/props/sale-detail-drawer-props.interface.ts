import { Dispatch, SetStateAction } from "react"
import { SaleDetail } from "../sale.interface"

export interface SaleDetailDrawerProps {
  openDrawer: boolean
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
  saleDetail: SaleDetail
}