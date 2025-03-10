export const getToken = (): string => {
  try {
    const token = JSON.parse(localStorage.getItem('accessToken') || '');
    return token
  } catch (error) {
    return '';
  }
}

export const getUserInfo = () => {
  try {
    const token = JSON.parse(localStorage.getItem('accessToken') || '');
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  } catch (error) {
    return '';
  }
}

export const setTokenCredentials = (accessToken: string, expirationTime: number): void => {
  localStorage.setItem('accessToken', JSON.stringify(accessToken));
  localStorage.setItem('expiresIn', JSON.stringify(expirationTime));
  localStorage.setItem('isAuth', JSON.stringify(true));
} 