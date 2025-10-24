import { BaseAgent } from './base.js'
import type { AgentResponse } from '../types.js'

export class SummarizerAgent extends BaseAgent {
    constructor() {
        super({
            name: "summarizerAgent",
            prompt: `
            you are a summarizer agent.
            your job is to take text, plans, or results from other agents and produce a consise well structured summary.
            make it clear, factual, and easy to understand.
            `
        })
    }

    async summarize(content: string[]) : Promise<AgentResponse> {
        const input = 
        `
        summarize the followinf content clearly and lofgically: 
        ${content.join("\n\n")}
        `
        return await this.run(input)
    }
}