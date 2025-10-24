import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions'
import { AgentOptions, AgentResponse } from '../types.js'
import { callLLM } from '../utils/llm.js'

export class BaseAgent {
    name: string;
    prompt: string

    constructor({name, prompt} : AgentOptions)  {
        this.name = name;
        this.prompt = prompt;
    }

    async run (input: string ) : Promise<AgentResponse> {
        const messages:   ChatCompletionMessageParam[] = [
            { role: "system", content: this.prompt},
            { role: "user", content: input}
        ]

        const output = await callLLM(messages);
        return { role: this.name, output}
    }
}