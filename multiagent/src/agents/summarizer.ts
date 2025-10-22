import { BaseAgent } from './base'

export const systemSummarizer = new BaseAgent({
    name: "summarizer",
    systemPrompt: `
    you are a summarizer agent.
    given a list of research nodes, provide a clear short summary (under 50 words) that captures the key insigts and takeaways.
    `
})