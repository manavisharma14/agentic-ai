import { BaseAgent } from './base.js'
import type { AgentResponse } from '../types.js'

export class PlannerAgent extends BaseAgent {
    constructor() {
        super({
            name: "PlannerAgent",
            prompt: `
            you are the planner agent.
            your task is to break down any goal a user gives into a sequence of clear, actionable and well organised steps.
            each step should be pratical and ordered logically.
            output only the plan as a numbered list.
            `
        })
    }

    async plan(goal: string, context: string[] = []): Promise<AgentResponse> {
        const fullInput = `
        goal ${goal}
        context(optional) : 
        ${context.join("\n")}
        `;
        return await this.run(fullInput)
    }
}