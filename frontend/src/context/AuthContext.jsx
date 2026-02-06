import { createContext, useState, useContext, useEffect } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

   

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if(token) {
            try {
                const response = await authAPI.getProfile();
                setUser(response.data.data);
            } catch (error) {
                // localStorage.removeItem('token')
                // localStorage.removeItem('user')

                // Token is invalid or expired - clear everything
                console.log('Auth check failed, clearing credentials')
                clearCredentials();
            }
        }
        setLoading(false);
    }

      useEffect(() => {
        checkAuth();
    }, );

    // Helper function to clear all credentials
    const clearCredentials = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user')
        setUser(null)
    }

    const login = async (credentials) => {
        // CLear any existing credentials before login attempt
        clearCredentials()

        const response = await authAPI.login(credentials);
        if(response.data.success) {
            const { token, ...userData} = response.data.data;
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
        }
        return response.data;
    }

    const signup = async (userData) => {
        // Clear any existing credentials before signup attempt
        clearCredentials();

        const response = await authAPI.signup(userData);
        if(response.data.success) {
            const {token, ...user } = response.data.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
        }
        return response.data;
    }
    const logout = () => {
        clearCredentials();
        // localStorage.removeItem('token');
        // localStorage.removeItem('user');
        // setUser(null);
    }
    const value = {
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin'
    }

   

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}