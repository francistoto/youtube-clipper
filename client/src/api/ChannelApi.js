import { axiosGET } from './utilities/fetching';

const ChannelAPI = {
    getDefaultChannel: () => {
        return axiosGET('/channels/default');
    },
    getChannelsByUser: async (userId) => {
        const response = await axiosGET(`/channels/user/${userId}`);

        return response.data;
    },
    getChannelById: async (channelId) => {
        const response = await axiosGET(`/channels/${channelId}`);

        return response.data;
    }
};

export default ChannelAPI;
