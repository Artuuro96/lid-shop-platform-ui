import { Dispatch, SetStateAction } from "react";
import { DgAlert } from "./dg-alert-context.interface";

export interface DialogAlertContextProps {
  dgAlert: DgAlert;
  setDgAlert: Dispatch<SetStateAction<DgAlert>>;
}