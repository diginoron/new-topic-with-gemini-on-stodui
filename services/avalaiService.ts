import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Topic } from "../types";

// The API key must be obtained exclusively from `process.env.API_KEY`.
// Assume this variable is pre-configured, valid, and accessible in the execution context.
const API_KEY = process.env.API_KEY;

// Do not generate any UI elements or code snippets for entering or managing the API key.
if (!API_KEY) {
  throw new Error("API_KEY is missing. Please ensure it is set as an environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateTopicSuggestions(keywords: string): Promise<Topic[]> {
  const prompt = `
    کاربر کلمات کلیدی زیر را وارد کرده است:
    "${keywords}"

    لطفاً ۵ موضوع جذاب، خلاقانه و کاربردی بر اساس این کلمات کلیدی پیشنهاد دهید.
    هر موضوع باید یک جمله کامل و واضح باشد.
    فقط موضوعات را به صورت لیست شماره‌دار برگردانید، بدون توضیح اضافی.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Model selection for Basic Text Tasks
      contents: prompt,
      config: {
        systemInstruction: "You are an expert topic generator.",
        temperature: 0.7,
        // Recommendation: Avoid setting maxOutputTokens if not required to prevent the response from being blocked.
      },
    });

    // Extracting text output using the correct .text property
    const text = response.text;
    return text
      .split("\n")
      .map(line => line.replace(/^\d+\.\s*/, "").trim())
      .filter(line => line.length > 0);
  } catch (error: any) {
    console.error("API Error:", error);
    throw new Error("خطا در ارتباط با هوش مصنوعی. لطفاً دوباره تلاش کنید.");
  }
}