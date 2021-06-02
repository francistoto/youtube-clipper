import axios from 'axios';

const token = localStorage.getItem('token') || null;

const axiosInstance = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: {
        ContentType: 'application/json',
        Authorization: `Bearer ${token}`
    }
});

export const axiosGET = (url, options = {}) => {
    console.log('token', token);
    return axiosInstance.get(url, options);
};

export const axiosPOST = (url, data, options = {}) => {
    return axiosInstance.post(url, data, options);
};

export const axiosPUT = (url, data, options = {}) => {
    return axiosInstance.put(url, data, options);
};

export const axiosDELETE = (url, options = {}) => {
    return axiosInstance.delete(url, options);
};
