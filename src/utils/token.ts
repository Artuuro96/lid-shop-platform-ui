export const getToken = (): string => {
  try {
    const token = JSON.parse(localStorage.getItem('accessToken') || '');
    return token
  } catch (error) {
    return '';
  }
}

export const setTokenCredentials = (accessToken: string, expirationTime: number): void => {
  localStorage.setItem('accessToken', JSON.stringify(accessToken));
  localStorage.setItem('expiresIn', JSON.stringify(expirationTime));
  localStorage.setItem('isAuth', JSON.stringify(true));
} 