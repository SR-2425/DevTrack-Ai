
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Analyzes developer metrics using Gemini Flash to provide AI-driven productivity insights.
export const getDeveloperInsights = async (stats: any): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a simplistic engineering coach. Review these developer stats: ${JSON.stringify(stats)}. 
      Provide exactly two short, direct sentences focusing on ONE clear improvement. 
      Use simple language. No jargon. No lists. Just a friendly, actionable reflection.`,
      config: {
        temperature: 0.4,
      }
    });

    return response.text?.trim() || "Try to commit code more frequently to maintain your momentum.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Consistently committing small changes daily will help your long-term growth.";
  }
};
