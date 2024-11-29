/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GGAPI_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const safetySetting = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

const generationConfig = {
  temperature: 1,
  topP: 1,
  topK: 1,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(textInput: any, chatHistory: any) {
  const history = (chatHistory || []).map((item: any) => {
    return {
      role: item.isBot ? "model" : "user",
      parts: [{ text: item.text }],
    };
  });
  const chatSession = model.startChat({
    generationConfig,
    history: history,
  });

  const result = await chatSession.sendMessage(textInput);
  return result.response.text();
}

export default run;
