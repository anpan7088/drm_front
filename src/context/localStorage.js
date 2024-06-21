
// Initial state loaded from localStorage
const initialState = {
    userID: localStorage.getItem('userID') || null,    // User ID
    userName: localStorage.getItem('userName') || '',
    fullName: localStorage.getItem('fullName') || '',
    userRole: localStorage.getItem('userRole') || null,
    token: localStorage.getItem('token') || null,
};


const removeCredentials = () => {
    localStorage.removeItem('userID');
    localStorage.removeItem('userName');
    localStorage.removeItem('fullName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
};

const storeCredentials = (credent) => {
    const { userID, userName, fullName, userRole, token } = credent;
    localStorage.setItem('userID', userID);
    localStorage.setItem('userName', userName);
    localStorage.setItem('fullName', fullName);
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('token', token);
};

export { removeCredentials, storeCredentials, initialState };
