import { axiosDELETE, axiosGET, axiosPOST } from './utilities/fetching';

const VideoAPI = {
    getVideosByChannel: async (channelId) => {
        const response = await axiosGET(`/videos/channel/${channelId}`);

        return response.data
    },
    createVideos: (newVideos) => {
        return axiosPOST('/videos/create', { newVideos });
    },
    deleteVideo: (videoId) => {
        return axiosDELETE('/videos', { videoId })
    }
};

export default VideoAPI;
