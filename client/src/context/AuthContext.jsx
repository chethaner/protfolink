import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    const checkUserLoggedIn = async () => {
        try {
            const { data } = await axios.get('/api/auth/me');
            setUser(data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (formData) => {
        try {
            console.log('Attempting login with:', formData.email);
            const { data } = await axios.post('http://localhost:5000/api/auth/login', formData);
            console.log('Login response:', data);

            // Store token in localStorage
            if (data.token) {
                localStorage.setItem('token', data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                console.log('Token stored successfully');
            }

            setUser(data.user || data);
            toast.success('Logged in successfully!');
            return true;
        } catch (error) {
            console.error('Login error:', error);
            console.error('Error response:', error.response?.data);
            toast.error(error.response?.data?.message || 'Login failed');
            return false;
        }
    };

    const register = async (formData) => {
        try {
            console.log('Attempting registration:', formData.email);
            const { data } = await axios.post('http://localhost:5000/api/auth/register', formData);
            console.log('Registration response:', data);

            // Store token in localStorage
            if (data.token) {
                localStorage.setItem('token', data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                console.log('Token stored successfully');
            }

            setUser(data.user || data);
            toast.success('Registered successfully!');
            return true;
        } catch (error) {
            console.error('Registration error:', error);
            console.error('Error response:', error.response?.data);
            toast.error(error.response?.data?.message || 'Registration failed');
            return false;
        }
    };

    const logout = async () => {
        try {
            await axios.post('/api/auth/logout');
            setUser(null);
            toast.success('Logged out');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
