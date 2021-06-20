import { axiosDELETE, axiosGET, axiosPOST } from './utilities/fetching';

const ChannelAPI = {
    getDefaultChannel: async () => {
        const response = await axiosGET('/channels/default');

        return response.data;
    },
    getChannelsByUser: async (userId) => {
        const response = await axiosGET(`/channels/user/${userId}`);

        return response.data;
    },
    getChannelById: async (channelId) => {
        const response = await axiosGET(`/channels/${channelId}`);

        return response.data;
    },
    createChannel: async (newChannel) => {
        const response = await axiosPOST('/channels/create', newChannel);

        return response.data;
    },
    updateChannel: async (newChannel) => {
        const response = await axiosPOST('/channels/update', newChannel);

        return response.data;
    },
    deleteChannel: async (channelId) => {
        const response = await axiosDELETE('/channels/delete', { channelId });

        return response.data;
    }
};

export default ChannelAPI;
