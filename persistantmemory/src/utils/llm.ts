import OpenAI from 'openai'
import dotenv from 'dotenv';
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function callLLM(messages: ChatCompletionMessageParam[]) : Promise<string> {
    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.7
    })

    return response.choices[0]?.message.content || "";
}