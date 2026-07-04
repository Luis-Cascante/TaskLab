import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { UserDBAnwer } from '../types/user';
import type { LoginCredentials, AuthContextType } from '../types/auth';
import { authService } from '../services/auth';
import { tokenStorage, isTokenExpired } from '../utils/token';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<UserDBAnwer | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize auth state from localStorage
    useEffect(() => {
        const initAuth = () => {
            const storedToken = tokenStorage.getToken();
            const storedUser = tokenStorage.getUser();

            if (storedToken && storedUser) {
                // Check if token is expired
                if (isTokenExpired(storedToken)) {
                    tokenStorage.clear();
                    setIsLoading(false);
                    return;
                }

                try {
                    const parsedUser = JSON.parse(storedUser);
                    setToken(storedToken);
                    setUser(parsedUser);
                } catch (error) {
                    console.error('Error parsing stored user:', error);
                    tokenStorage.clear();
                }
            }
            setIsLoading(false);
        };

        initAuth();
    }, []);

    const login = async (credentials: LoginCredentials) => {
        setIsLoading(true);
        try {
            const response = await authService.login(credentials);
            tokenStorage.setToken(response.token);
            tokenStorage.setUser(JSON.stringify(response.user));
            setToken(response.token);
            setUser(response.user);
            return response.user; 
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        tokenStorage.clear();
        setToken(null);
        setUser(null);
    };

    const value: AuthContextType = {
        user,
        token,
        isAuthenticated: !!token && !!user,
        login,
        logout,
        isLoading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
