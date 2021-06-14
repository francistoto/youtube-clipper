import { axiosPOST } from '.utilities/fetching';

export const getVideos = async (query) => {
    const response = await axiosPOST('/youtube/search', { query });

    return response.data;
};
