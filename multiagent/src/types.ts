export interface Message {
    role: "system" | "user" | "assistant",
    content: string
}

export interface AgentResponse {
    role: string;
    output: string;
    metadata?: string
}

export interface AgentConfig{
    name: string;
    systemPrompt: string
}

export interface OrchestrationResult {
    planner: AgentResponse;
    researcher: AgentResponse;
    summarizer: AgentResponse;
    critic: AgentResponse
}

export interface AgentOptions {
    name: string;
    systemPrompt: string;
  }