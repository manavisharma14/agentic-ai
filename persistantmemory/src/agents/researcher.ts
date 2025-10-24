import { BaseAgent } from './base.js'
import type { AgentResponse } from '../types.js'


export class ResearchAgent extends BaseAgent {
  constructor() {
    super({
      name: "ResearchAgent",
      prompt: `
You are the Research Agent.
Your role is to gather key facts, definitions, and relevant information about a topic.
When asked, provide structured factual points only.
Avoid repetition or speculation.
      `,
    });
  }

  async research(topic: string): Promise<AgentResponse> {
    const input = `Research and summarize essential information about: ${topic}`;
    return await this.run(input);
  }
}