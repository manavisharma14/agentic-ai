import OpenAI from 'openai'
import dotenv from 'dotenv'
import type {Message} from '../types.js'

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function callLLM(messages: Message[]) : Promise<string> {
    const response = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.7
    })
    return response.choices[0]?.message?.content || ""
}