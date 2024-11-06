import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({
  apiKey: "AIzaSyDttmLJaEMTwJ4JOiG9uCAU9HignOITTgg",
});

let chatHistory = [];

export async function handleGenerateText(userInput) {
  try {
    chatHistory.push({ role: "user", content: userInput });
    const prompt = chatHistory
      .map((message) =>
        message.role === "user"
          ? `User: ${message.content}`
          : `AI: ${message.content}`
      )
      .join("\n");

    let { text } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt: prompt,
      temperature: 0.1,
      system: "You are a chatbot,Your knowledge is only about bannari amman institute of technology",
    });

    chatHistory.push({ role: "ai", content: text });
    return text; // No need to replace asterisks here, as we want Markdown to be preserved
  } catch (error) {
    console.error("Error fetching Gemini AI response:", error);
    return null;
  }
}
