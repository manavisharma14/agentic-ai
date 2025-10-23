import { BaseAgent } from "./base.js";

export const systemPlanner = new BaseAgent({
  name: "planner",
  systemPrompt: `
You are a planner agent.
Your job is to break the user's main goal into clear, numbered tasks.
Keep the steps concise and actionable.
`
});