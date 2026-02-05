import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (savedUser && token) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            // For now, simulate API call but keep structure
            if (email && password) {
                const mockUser = {
                    id: 'u1',
                    email,
                    role: email.includes('empresa') ? 'employer' : 'seeker',
                    name: email.split('@')[0]
                };
                const mockToken = 'mock-jwt-token';

                localStorage.setItem('user', JSON.stringify(mockUser));
                localStorage.setItem('token', mockToken);
                setUser(mockUser);
                return { success: true };
            }
            return { success: false, message: 'Credenciales inválidas' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
