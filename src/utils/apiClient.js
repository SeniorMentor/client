const axios = require('axios');
const { getToken } = require('./helpers');

let token = null;

export const clientGet = async (api, body, withToken) => {
    if(withToken) {
        setToken();
    }
    return await axios.get(api, body);
};

export const clientPost = async(api, body, withToken) => {
    if(withToken) {
        setToken();
    }
    return await axios.post(api, body);
};

export const clientPut = async(api, body, withToken) => {
    if(withToken) {
        setToken();
    }
    return await axios.put(api, body);
};

export const setToken = () => {
   token = getToken();
   axios.defaults.headers.common['authorization'] = token; 
} 