import { BaseAgent } from './agents/base.js'

export async function runAgent(agent: BaseAgent, input: string){
    try{
        console.log(`running agent ${agent.name}`);
        const response = await agent.run(input);
        console.log(`${agent.name} output: \n ${response.output}`)
        return response.output;
    } catch(error){
        console.log(`error in ${agent.name}: ${error}`)
        return "";
    }
}


export async function executeWorkflow(goal: string, agents: Record<string, BaseAgent>){
    console.log(`goal received : `, goal);

    if (!agents.planner) {
        throw new Error("Planner agent is not defined");
    }
    const planText = await runAgent(agents.planner, goal);

    // split plan into sepearte tasks
    const tasks = planText?.split(/\n+/).filter(Boolean);

    // research each task
    const taskResults: string[] = [];
    if(!tasks){
        console.log(`error`);
        return;
    }

    if(!agents.researcher){
        throw new Error("Researcher agent is not defined");
    }
    for(const task of tasks){
        const result = await runAgent(agents.researcher, task);
        taskResults.push(`task ${task} \n result : ${result}`)
    }

    if(!agents.summarizer){
        throw new Error("summary agent is not defined");
    }

    const summary = await runAgent(agents.summarizer, taskResults.join("\n\n"));

    if(!agents.critic){
        throw new Error("critic agent is not defined");
    }

    if(!summary){
        console.log(`error no summary`)
        return "";
    }

    const critique = await runAgent(agents.critic, summary);

    return { plan: planText, summary, critique}
}