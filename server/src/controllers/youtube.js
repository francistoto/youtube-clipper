const { google } = require('googleapis');
const { GOOGLE_API_KEY } = process.env

const youtube = google.youtube({
    version: 'v3',
    auth: GOOGLE_API_KEY
});

const SEARCH_PARAMS = {
    part: 'snippet',
    maxResults: 10,
    safeSearch: 'moderate',
    type: 'video',
    videoDefinition: 'high',
    videoEmbeddable: true,
    videoSyndicated: true
};

const processSearchResults = (searchResults) => {
    const { data: { items: videoResults } } = searchResults;
    return videoResults.map((videoResult) => {
        const { id: { videoId: url }, snippet: { title, thumbnails: { medium: { url: thumbnail } } } } = videoResult;
        
        return {
            url,
            title,
            thumbnail,
            platform: 'youtube'
        };
    });
}

module.exports = {
    searchVideos: async (req, res) => {
        const { query } = req.body;

        try {
            const results = await youtube.search.list({ q: query, ...SEARCH_PARAMS });

            const response = processSearchResults(results)
    
            res.status(200).send(response);
        } catch (error) {
            res.status(404).send(error.message);
        }
    }
};
