export interface DialogAlertProps {
  handleAccept: () => void,
  open: boolean,
  contentText: string,
  title: string,
}