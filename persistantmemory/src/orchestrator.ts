import { storeMemory, retrieveReleventMemories } from './memory.js'
import { BaseAgent } from './agents/base.js'
import type { AgentResponse } from "./types.js"

export async function runAgent(agent: BaseAgent, input: string): Promise<string> {
    try {
        console.log(`running agent ${agent.name}`);
        const response = await agent.run(input);
        console.log(`${agent.name} output: ${response.output}\n`)
        return response.output;
    } catch(error){
        console.log(`error in agent ${agent.name} : `, error);
        return "";
    }
}

export async function executeWorkFlow(
    goal: string, 
    agents: Record<string, BaseAgent>
) {
    console.log(`goal received ${goal}`);

    // retrieve relevent memories before starting out
    const pastMemories = await retrieveReleventMemories(goal);
    if(pastMemories.length > 0) {
        console.log(`retrieved past memories`);
        pastMemories.forEach((m, i) => console.log(`${i+1}.${m}`));
    } else {
        console.log(`no relevent memories found`);
    }

    // step 1 plan
    if(!agents.planner) throw new Error("planner agent missing");
    const planText = await runAgent(
        agents.planner,
        `goal ${goal} \n\n relevent past context ${pastMemories.join("\n")}`
    )

    const tasks = planText?.split(/\n+/).filter(Boolean).map((t) => t.replace(/^\d+\.\s*/, ""));

    if(!tasks?.length)  throw new Error("no tasks found in plan");

    if(!agents.researcher) throw new Error("researcher agent missing")
    
    const taskResults: string[] = [];
    for(const task of tasks){
        const result = await runAgent(agents.researcher, task);
        taskResults.push(`task : ${task} \n results: ${result}`)
    }

    if(!agents.summarizer) throw new Error("summarizer agent missing");
    const summaryInput = taskResults.join("\n\n");
    const summary = await runAgent(agents.summarizer, summaryInput );

    if (!agents.critic) throw new Error("Critic agent missing.");
    const critique = await runAgent(agents.critic, summary);

    // store final output as a new memory

    const memoryEntry = `
    goal ${goal}
    plan ${planText}
    summary ${summary}
    critiqur ${critique}
    `

    await storeMemory(memoryEntry);
    console.log(`memory stored successfully`)

    return { plan: planText, summary, critique}
}