export interface User {
  userId: string;
  username: string;
  name: string;
  lastName: string;
  secondLastName: string;
  email: string;
  roles: string[];
  modules: string[];
  iat: number;
  exp: number;
}
