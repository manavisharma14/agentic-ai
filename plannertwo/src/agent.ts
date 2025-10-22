import { generatePlan } from './planner'
import { executeStep } from './executor'

export async function runAgent(goal: string){
    console.log(`goal received ${goal}`)

    const plan = await generatePlan(goal);
    console.log("plan generated :  ", JSON.stringify(plan,null,2));

    let context = "";
    for (const step of plan.steps){
        const result = await executeStep(step, context);
        context += `\n [step ${step.id} : ${step.action} ] ${result}`
    }
    console.log("\n final output", context);
}

runAgent("Summarize recent research on AI in medicine");
