export interface AgentOptions {
    name: string;
    systemPrompt: string;
}

export interface AgentResponse {
    role: string;
    output: string;
}