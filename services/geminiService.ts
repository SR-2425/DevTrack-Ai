
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { AIAssistantAdvice, SummaryStats } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Provides the proactive, structured advice shown on the dashboard panels.
 */
export const getDeveloperAssistantAdvice = async (stats: SummaryStats): Promise<AIAssistantAdvice> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a developer wellness and productivity assistant. 
      Analyze the following stats: ${JSON.stringify(stats)}.
      Provide advice in three categories:
      1. Performance: How to optimize coding output.
      2. Wellness: When to take breaks and how to avoid burnout.
      3. Balance: Strategic advice on balancing deep work vs maintenance.
      Keep each response short (max 20 words).`,
      config: {
        temperature: 0.5,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            performance: { type: Type.STRING },
            wellness: { type: Type.STRING },
            balance: { type: Type.STRING }
          },
          required: ["performance", "wellness", "balance"]
        }
      }
    });

    return JSON.parse(response.text || '{}') as AIAssistantAdvice;
  } catch (error) {
    console.error("Gemini Assistant Error:", error);
    return {
      performance: "Maintain your current commit frequency to keep the momentum high.",
      wellness: "Schedule a 15-minute screen break every 90 minutes of coding.",
      balance: "Dedicate 20% of your time to refactoring stale code repositories."
    };
  }
};

/**
 * Handles conversational chat queries from the floating bot.
 */
export const chatWithAssistant = async (message: string, stats: SummaryStats): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User Stats: ${JSON.stringify(stats)}. User Question: "${message}". 
      Answer as a friendly DevTrack AI assistant. Be concise, use technical context if relevant, and encourage the user.`,
      config: {
        systemInstruction: "You are DevTrack AI. Your goal is to help developers improve productivity and maintain wellness. You have access to their stats.",
        temperature: 0.7,
      }
    });
    return response.text || "I'm not sure how to answer that right now, but keep up the great work!";
  } catch (error) {
    return "I'm having trouble connecting to my brain right now. Try again in a second!";
  }
};
