import { google } from 'googleapis';
import { getNewAccessToken, oauth2Client} from './oAuthService.js';
import { YoutubeTranscript } from 'youtube-transcript';

export async function getLatestVideoFromChannel(youtube, channelId, querySearch) {
  try {
    const response = await youtube.search.list({
      auth: oauth2Client,
      part: 'snippet',
      channelId: channelId,
      q: querySearch,
      order: 'date',
      type: 'video',
      maxResults: 1
    });
    if (response.data.items.length > 0) {
      return response.data.items[0].id.videoId;
    } else {
      throw new Error('No videos found for this channel');
    }
  } catch (error) {
    console.error('Error fetching latest video:', error.message);
    throw error;
  }
}

export async function postCommentOnVideo(youtube, videoId, commentText) {
  try {
    const response = await youtube.commentThreads.insert({
      auth: oauth2Client,
      part: 'snippet',
      requestBody: {
        snippet: {
          videoId: videoId,
          topLevelComment: {
            snippet: {
              textOriginal: commentText
            }
          }
        }
      }
    });
    console.log('Comment posted successfully. Comment ID:', response.data.id);
    return response.data.id;
  } catch (error) {
    console.error('Error posting comment:', error.message);
    throw error;
  }
}

export async function initializeYouTubeClient() {
  try {
    const accessToken = await getNewAccessToken();
    oauth2Client.setCredentials({ access_token: accessToken });
    return google.youtube({
      version: 'v3',
      auth: oauth2Client
    });
  } catch (error) {
    console.error('Error initializing YouTube client:', error);
    throw error;
  }
}

export async function getTranscriptForVideo(videoId) {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    return transcript.map(item => item.text).join(' ');
  } catch (error) {
    console.error('Error fetching transcript:', error.message);
    throw error;
  }
}