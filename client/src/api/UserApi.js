import { axiosGET } from './utilities/fetching';
// import axios from 'axios';

// const token = localStorage.getItem('token') || null;

const UserAPI = {
    getCurrentUser: async () => {
        const response = await axiosGET('/users/current');

        return response.data;
    }
};

export default UserAPI;
