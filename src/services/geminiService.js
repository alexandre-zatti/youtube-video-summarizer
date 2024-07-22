import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from '../config/env.js';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function processTranscriptWithGemini(transcript) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `
    Analyze the following transcript from a YouTube video and summarize in a bullet list format
    the main points presented. 
         ${transcript}
  `;
  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
}

