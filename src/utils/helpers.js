import jwt_decode from "jwt-decode";

export const setToken = (token) => {
    localStorage.setItem('auth-token', token);
};

const getToken = () => {
    return localStorage.getItem('auth-token');
};

export const setUserData = (data) => {
    localStorage.setItem('user-data', JSON.stringify(data));
};

export const storeUserData = (data) => {
    let token = getToken();
    if(!token) {
        return null;
    }
    let tokenData = jwt_decode(token);
    setUserData({
        userId: tokenData.userId,
        role: tokenData.role,
        name: `${data?.firstName} ${data?.lastName}`, 
    })
};

export const getRole = () => {
    return getUserData()?.role ?? 'guest';               
}

const getUserData = () => {
    const res = localStorage.getItem('user-data');
    if(!res) {
        return null;
    }
    return JSON.parse(res);
};
  
  
const clearUser = () => {
    localStorage.removeItem('user-data');
    localStorage.removeItem('auth-token');
};