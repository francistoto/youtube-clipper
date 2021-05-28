import axios from 'axios';

const UserAPI = {
    getCurrentUser: async () => {
        const response = await axios.get('/api/users/current');

        return response.data;
    }
};

export default UserAPI;
