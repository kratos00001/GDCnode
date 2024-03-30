const { google } = require('googleapis');
const auth2Client = require('./auth.routes.js');

const youtubeService = {
  getMyVideos: async () => {
    const service = google.youtube('v3');
    const parameters = {
      auth: auth2Client,
      part: 'snippet,contentDetails',
      mine: true
    };
    
    try {
      const response = await service.videos.list(parameters);
      return response.data.items;
    } catch (error) {
      throw error;
    }
  },
  // Additional functions for other YouTube operations...
};

module.exports = youtubeService;
