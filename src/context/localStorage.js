
// Initial state loaded from localStorage
const initialState = {
    userID: localStorage.getItem('userID') || null,    // User ID
    userName: localStorage.getItem('userName') || '',
    fullName: localStorage.getItem('fullName') || '',
    userRole: localStorage.getItem('userRole') || null,
    token: localStorage.getItem('token') || null,
    expirationTime: localStorage.getItem('expirationTime') || null
};

// Function to remove credentials from localStorage
const removeCredentials = () => {
    localStorage.removeItem('userID');
    localStorage.removeItem('userName');
    localStorage.removeItem('fullName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime')
};

// Function to store credentials in localStorage
const storeCredentials = (credent) => {
    const { userID, userName, fullName, userRole, token, expirationTime } = credent;
    localStorage.setItem('userID', userID);
    localStorage.setItem('userName', userName);
    localStorage.setItem('fullName', fullName);
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expirationTime);
};

// Export the functions
export { removeCredentials, storeCredentials, initialState };
