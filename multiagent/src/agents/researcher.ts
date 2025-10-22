import { BaseAgent } from './base'

export const systemResearcher = new BaseAgent({
    name: "researcher",
    systemPrompt: `
    you are a researcher agent.
    for each task provided, search your knowdledge and generate choices, factual findings.
    focus on clarity and accuract. use bullet points, not paragraphs.
    `
})