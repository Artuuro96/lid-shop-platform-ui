import { format } from "date-fns"
import { es } from "date-fns/locale"

export const formatFullMXDate = (date: string): string => {
  return format(new Date(date), 'EEEE d \'de\' MMMM \'de\' yyyy', { locale: es }) || '';
}

export const formatDateHours = (date: string): string => {
  return format(new Date(date), "dd/MM/yyyy HH:mm", { locale: es });  
}

export const formatDate = (date: string): string => {
  return format(new Date(date), "dd/MM/yyyy", { locale: es });  
}