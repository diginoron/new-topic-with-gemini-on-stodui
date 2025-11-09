import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Topic } from "../types";

// @google/genai: The API key must be obtained exclusively from `process.env.API_KEY`.
// @google/genai: Do not define `process.env` or request that the user update the API_KEY in the code.
// For client-side Vite applications, VITE_ prefixed variables are exposed via import.meta.env
// Fix: Replace import.meta.env.VITE_API_KEY with process.env.API_KEY as per coding guidelines.
const API_KEY = process.env.API_KEY;

// @google/genai: The API key is assumed to be pre-configured, valid, and accessible.
// Do not generate any UI elements or code snippets for entering or managing the API key.
// Fix: Remove the manual API key validation check as it's assumed to be handled externally.

// @google/genai: Always use `const ai = new GoogleGenAI({apiKey: process.env.API_KEY});`.
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
    // @google/genai: When using generate content for text answers, do not define the model first and call generate content later.
    // @google/genai: You must use `ai.models.generateContent` to query GenAI with both the model name and prompt.
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash", // @google/genai: Model selection for Basic Text Tasks
      contents: prompt,
      config: {
        systemInstruction: "You are an expert topic generator.",
        temperature: 0.7,
        // @google/genai: Recommendation: Avoid setting maxOutputTokens if not required to prevent the response from being blocked.
      },
    });

    // @google/genai: The `GenerateContentResponse` object has a property called `text` that directly provides the string output.
    const text = response.text;
    return text
      .split("\n")
      .map(line => line.replace(/^\d+\.\s*/, "").trim())
      .filter(line => line.length > 0);
  } catch (error: any) {
    console.error("API Error:", error);
    // Re-throw a user-friendly error message
    throw new Error("خطا در ارتباط با هوش مصنوعی. لطفاً دوباره تلاش کنید.");
  }
}