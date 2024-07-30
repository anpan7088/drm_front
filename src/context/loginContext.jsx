import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { initialState, removeCredentials, storeCredentials } from './localStorage';
import LoginPopUp from '../components/LoginPopUp';

const LoginContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useLoginContext = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
    const [userData, setUserData] = useState(initialState);
    const [isLoginVisible, setIsLoginVisible] = useState(false);

    const login = (userID, userName, fullName, userRole, token) => {
        setUserData({ userID, userName, fullName, userRole, token });
        storeCredentials({ userID, userName, fullName, userRole, token });
    };

    const logout = () => {
        setUserData({ userID: null, userName: '', fullName: '', userRole: null, token: null });
        removeCredentials();
    };

    const showLogin = () => setIsLoginVisible(true);
    const hideLogin = () => setIsLoginVisible(false);

    return (
        <LoginContext.Provider
            value={{
                ...userData,   // { userID, userName, fullName, userRole, token } 
                login, logout,  // functions for login and logout
                showLogin, hideLogin  // this can be optimized ??? may be
            }}>
            {children}
            <LoginPopUp show={isLoginVisible} handleClose={hideLogin} />
        </LoginContext.Provider>
    );
};

LoginProvider.propTypes = {
    children: PropTypes.node
};

export default LoginContext;
