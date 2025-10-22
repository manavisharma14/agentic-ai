import { BaseAgent } from './base'

export const systemPlanner = new BaseAgent({
    name: "planner",
    systemPrompt: `
    you are a planner agent.
    given a goal, beak it into 2-4 specific researchable tasks.
    output in plain numbered list.
    `,
});