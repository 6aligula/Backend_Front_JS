import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/users');
                const authUser = response.data;

                if (authUser) {
                    setUser({
                        uid: authUser.uid, 
                        username: authUser.displayName,
                        email: authUser.email,
                    });
                } else {
                    setUser(null);
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching user:', error);
                setIsLoading(false);
            }
        };

        fetchUser();

    }, []);

    const logoutUser = async () => {
        try {
            await axios.post('/api/users/logout');
            setUser(null);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    
    const contextValue = {
        user,
        isLoading,
        setUser,
        setIsLoading,
        logoutUser,
    };
    
    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

const useUserContext = () => {
    return useContext(UserContext);
};

export { UserProvider, useUserContext };
