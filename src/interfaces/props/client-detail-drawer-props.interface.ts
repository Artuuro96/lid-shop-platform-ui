import { Dispatch, SetStateAction } from "react"
import { ClientDetail } from "../client-detail.interface"

export interface ClientDetailDrawerProps {
  openDrawer: boolean;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
  clientDetail: ClientDetail;
}