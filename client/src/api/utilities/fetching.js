import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '/api',
    timeout: 5000
});

export const axiosGET = (url, options = {}) => {
    return axiosInstance.get(url, options);
};

export const axiosPOST = (url, data, options = {}) => {
    return axiosInstance.post(url, data, options);
};

export const axiosPUT = (url, data, options = {}) => {
    return axiosInstance.put(url, data, options);
};

export const axiosDELETE = (url, data, options = {}) => {
    return axiosInstance.delete(url, { data }, options);
};
