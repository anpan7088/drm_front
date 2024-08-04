// src/context/loginContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { initialState, removeCredentials, storeCredentials } from './localStorage';
import LoginPopUp from '../components/LoginPopUp';

const LoginContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useLoginContext = () => useContext(LoginContext);

// LoginProvider component
// This component is used to manage the login state and provide it to the rest of the application
export const LoginProvider = ({ children }) => {
    const [userData, setUserData] = useState(initialState);
    const [isLoginVisible, setIsLoginVisible] = useState(false);

    // Login function
    const login = (userID, userName, fullName, userRole, token, expiresIn) => {
        const expirationTime = Date.now() + expiresIn * 1000; // expiresIn is in seconds
        setUserData({ userID, userName, fullName, userRole, token, expirationTime });
        storeCredentials({ userID, userName, fullName, userRole, token, expirationTime });
    };

    // Logout function
    const logout = () => {
        setUserData({ userID: null, userName: '', fullName: '', userRole: null, token: null });
        removeCredentials();
    };

    // Show and hide login popup
    const showLogin = () => setIsLoginVisible(true);
    const hideLogin = () => setIsLoginVisible(false);

    // Check token expiration and auto logout
    useEffect(() => {
        if (!userData.token || !userData.expirationTime) return;

        const timeLeft = userData.expirationTime - Date.now();

        if (timeLeft <= 0) {
            logout();
        } else {
            const timeoutId = setTimeout(() => {
                logout();
            }, timeLeft);

            return () => clearTimeout(timeoutId);
        }
    }, [userData, logout]);

    return (
        <LoginContext.Provider
            value={{
                ...userData,        // { userID, userName, fullName, userRole, token, expirationTime } 
                login, logout,      // functions for login and logout
                showLogin, hideLogin  // this can be optimized ??? may be
            }}>
            {children}
            <LoginPopUp show={isLoginVisible} handleClose={hideLogin} />
        </LoginContext.Provider>
    );
};

// LoginProvider component props
LoginProvider.propTypes = {
    children: PropTypes.node   // React node
};

export default LoginContext;
