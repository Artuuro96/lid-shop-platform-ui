export interface UI {
  alert: AlertUI
}

export interface AlertUI {
  type: string;
  open: boolean;
  message: string;
}