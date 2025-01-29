import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '../interfaces/user.interface';
import { getToken } from '../utils/token';

const AuthContext = createContext<{
  user: User | null;
  loading: boolean;
  logout: () => void;
} | null>(null);

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Efecto para verificar autenticación al montar
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_AUTH_BASE_URL}token/introspect`,
          new URLSearchParams({
            token: getToken(),
            client_id: import.meta.env.VITE_CLIENT_ID,
            client_secret: import.meta.env.VITE_CLIENT_SECRET,
          }).toString(),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true,
          }
        );
        console.log("RESPONSEEEEEEEEEE", response)
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true }); // Endpoint de logout
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
