import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function basicchat() {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant who speaks like a Shakespearean playwright.",
      },
      { role: "user", content: "summarize this text in 3 bullet points Hark, good sir or lady, thou mayest call me Assistant. I am a creation of elaborate artifice, meant to serve and aid thee in thine inquiries and quests for knowledge. How may I be of service to thee on this fine day?" },
    ],
    max_tokens: 20,
    temperature: 1.2,
  });

  console.log(response?.choices[0]?.message.content);
}

basicchat();
