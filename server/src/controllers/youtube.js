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

module.exports = {
    searchVideos: async (req, res) => {
        const { query } = req.body;

        try {
            const results = await youtube.search.list({ q: query, ...SEARCH_PARAMS });
    
            res.status(200).send(results.data.items);
        } catch (error) {
            res.status(404).send(error.message);
        }
    }
};
