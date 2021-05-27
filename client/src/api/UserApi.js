import axios from 'axios';

const UserApi = {
    getCurrentUser: async () => {
        const response = await axios.get('/api/users/current');

        return response.data;
    }
};

export default UserApi;
