import { format } from "date-fns"
import { es } from "date-fns/locale"
import dayjs from "dayjs";
import { FrequencyEnum } from "../enum/frequency-enum";

export const formatFullMXDate = (date: string): string => {
  return format(new Date(date), 'EEEE d \'de\' MMMM \'de\' yyyy', { locale: es }) || '';
}

export const formatDateHours = (date: string): string => {
  return format(new Date(date), "dd/MM/yyyy HH:mm", { locale: es });  
}

export const formatDate = (date: string): string => {
  return format(new Date(date), "dd/MM/yyyy", { locale: es });  
}

export const getNextPaymentDate = (currentDate: Date, period: FrequencyEnum | null) => {
  if(period === FrequencyEnum.BIWEEKLY) {
    if(currentDate.getDate() < 15) {
      currentDate.setDate(15);
    } else {
      currentDate.setDate(30);
    }
  } else {
    if(currentDate.getDate() < 7) {
      currentDate.setDate(7);
    } else if (currentDate.getDate() < 15) {
      currentDate.setDate(15);
    } else if (currentDate.getDate() < 23) {
      currentDate.setDate(23);
    } else {
      currentDate.setDate(30);
    }
  }
  return dayjs(currentDate);
}