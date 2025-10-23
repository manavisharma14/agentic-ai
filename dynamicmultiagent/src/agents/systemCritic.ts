import { BaseAgent } from "./base.js";

export const systemCritic = new BaseAgent({
  name: "critic",
  systemPrompt: `
You are a critic agent.
Your job is to review the final summary, point out missing parts, and suggest improvements if needed.
`
});