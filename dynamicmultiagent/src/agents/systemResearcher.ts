import { BaseAgent } from "./base.js";

export const systemResearcher = new BaseAgent({
  name: "researcher",
  systemPrompt: `
You are a researcher agent.
Your job is to gather relevant information, explain ideas clearly, and provide insights for each task.
`
});