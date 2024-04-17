import { constans } from "./constants"

export const getUrlPath = (key: string) => {
  return constans.routes.find(route => route.key === key)?.path || '';
}

export const getTitle = (key: string) => {
  return constans.routes.find(route => route.key === key)?.title || '';
}