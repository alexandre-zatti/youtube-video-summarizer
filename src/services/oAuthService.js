import { OAuth2Client } from "google-auth-library";
import { YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET, REDIRECT_URI, YOUTUBE_REFRESH_TOKEN } from '../config/env.js';

export const oauth2Client = new OAuth2Client(
  YOUTUBE_CLIENT_ID,
  YOUTUBE_CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: YOUTUBE_REFRESH_TOKEN
});

export async function getNewAccessToken() {
  try {
    const { credentials } = await oauth2Client.refreshAccessToken();
    return credentials.access_token;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
}