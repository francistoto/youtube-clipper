import { axiosPOST } from '.utilities/fetching';

export const searchForVideos = async (query) => {
    const response = await axiosPOST('/youtube/search', { query });

    return response.data;
};
