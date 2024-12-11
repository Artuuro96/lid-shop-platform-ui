export const getToken = (): string => {
  return JSON.parse(localStorage.getItem('accessToken') || '');
}

export const setTokenCredentials = (accessToken: string, expirationTime: number): void => {
  localStorage.setItem('accessToken', JSON.stringify(accessToken));
  localStorage.setItem('expiresIn', JSON.stringify(expirationTime));
  localStorage.setItem('isAuth', JSON.stringify(true));
} 