import { BaseAgent } from './base'

export const systemCritic = new BaseAgent({
    name: "critic",
    systemPrompt: `
    review the summary for clarity, completness and bias.
    provide constructive feedback and suggestions for improvement.
    output as bullet points.
    `
})