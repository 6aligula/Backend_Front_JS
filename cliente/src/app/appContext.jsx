import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/user');  
                const authUser = response.data;

                if (authUser) {
                    setUser({
                        uid: authUser.uid,
                        username: authUser.username,
                        email: authUser.email,
                    });
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                    console.log('User is not logged in.');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                setIsLoading(false);
            }
        };

        fetchUser();

    }, []);

    return (
        <AppContext.Provider value={{ user, isLoading }}>
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, useAppContext };