import { axiosDELETE, axiosPOST } from './utilities/fetching';

const VideoAPI = {
    createVideos: (newVideos) => {
        return axiosPOST('/videos/create', { newVideos });
    },
    deleteVideo: (videoId) => {
        return axiosDELETE('/videos', { videoId })
    }
};

export default VideoAPI;
