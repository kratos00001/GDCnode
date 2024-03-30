const express = require('express');
const { google } = require('googleapis');
require('dotenv').config();

const router = express.Router();

const oauth2Client = new google.auth.OAuth2(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_CLIENT_SECRET,
  process.env.YOUTUBE_REDIRECT_URL
);

const scopes = [
  'https://www.googleapis.com/auth/youtube.readonly',
  'https://www.googleapis.com/auth/youtube.upload', 
];

router.get('/', async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    res.redirect(`http://localhost:4200/youtube/auth-callback#access_token=${tokens.access_token}`);
  } catch (error) {
    console.error('Error getting tokens:', error);
    res.status(500).send('Authentication failed');
  }
});
// Route to initiate the OAuth flow
router.get('/auth/youtube', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline', // 'offline' access type will result in a refresh_token
    scope: scopes,
    prompt: 'consent' // This forces the consent screen to be displayed every time. This is useful for testing, but can be removed in production.
  });
  res.redirect(authUrl); // Redirect to the Google's OAuth 2.0 server
});




module.exports = router;
