import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthData, authService } from '../services/authService';
import apolloClient from '../utils/apolloClient';

type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  signIn(username: string, password: string): Promise<void>;
  signOut(): void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData>();
  const [loading, setLoading] = useState(true);

  const loadStorageData = async (): Promise<void> => {
    try {
      const authDataSerialized = await AsyncStorage.getItem('@AuthData');
      if (authDataSerialized) {
        const authData: AuthData = JSON.parse(authDataSerialized);
        setAuthData(authData);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStorageData();
  }, []);

  const signIn = async (username: string, password: string) => {
    const authData = await authService.signIn(username, password);

    setAuthData(authData);
    apolloClient.resetStore();

    AsyncStorage.setItem('@AuthData', JSON.stringify(authData));
  };

  const signOut = async () => {
    setAuthData(undefined);
    apolloClient.resetStore();

    await AsyncStorage.removeItem('@AuthData');
  };

  const value = useMemo(
    () => ({ authData, loading, signIn, signOut }),
    [authData, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthContext, AuthProvider, useAuth };
