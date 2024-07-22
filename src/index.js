import {
  initializeYouTubeClient,
  getLatestVideoFromChannel,
  postCommentOnVideo,
  getTranscriptForVideo
} from './services/youtubeService.js';
import { processTranscriptWithGemini } from './services/geminiService.js';
import { YOUTUBE_CHANNEL_ID } from './config/env.js';

async function main() {
  try {
    const youtube = await initializeYouTubeClient();
    const latestVideoId = await getLatestVideoFromChannel(youtube, YOUTUBE_CHANNEL_ID, '');
    const transcript = await getTranscriptForVideo(latestVideoId);
    const summary = await processTranscriptWithGemini(transcript);
    const commentId = await postCommentOnVideo(youtube, latestVideoId, summary);
    console.log('Comment posted with ID:', commentId);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

void main();