import axios from 'axios';

const ChannelApi = {
    getDefaultChannel: () => {
        return axios.get('/api/channels/default');
    },
    getChannelsByUser: (userId) => {
        return axios.get(`/api/channels/user/${userId}`);
    },
    getChannelById: (channelId) => {
        return axios.get(`/api/channels/${channelId}`);
    }
};

export default ChannelApi;
