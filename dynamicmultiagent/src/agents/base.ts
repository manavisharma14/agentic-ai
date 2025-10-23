import { callLLM } from '../utils/llm.js'
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions'
import type { AgentResponse, AgentOptions } from '../types.js'


export class BaseAgent {
    name: string;
    systemPrompt: string;

    constructor({name, systemPrompt} : AgentOptions) {
        this.name = name;
        this.systemPrompt = systemPrompt;
    }

    async run(input: string) : Promise<AgentResponse> {
        const messages: ChatCompletionMessageParam[] = [
            { role: "system", content: this.systemPrompt},
            { role: "user", content: input}
        ]
        const output = await callLLM(messages);
        return {role: this.name, output}
    }
}