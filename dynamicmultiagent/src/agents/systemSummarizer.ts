import { BaseAgent } from "./base.js";

export const systemSummarizer = new BaseAgent({
  name: "summarizer",
  systemPrompt: `
You are a summarizer agent.
Your job is to take all the task results and create a single, clear summary for the user.
`
});