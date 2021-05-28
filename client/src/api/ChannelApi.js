import axios from 'axios';

const ChannelAPI = {
    getDefaultChannel: () => {
        return axios.get('/api/channels/default');
    },
    getChannelsByUser: async (userId) => {
        const response = await axios.get(`/api/channels/user/${userId}`);

        return response.data;
    },
    getChannelById: async (channelId) => {
        const response = await axios.get(`/api/channels/${channelId}`);

        return response.data;
    }
};

export default ChannelAPI;
