import { generatePlan } from './planner.js'
import { executeStep } from './executer.js'

export async function runAgent(goal: string){
    console.log(`goal received : ${goal}`)

    const plan = await generatePlan(goal);
    console.log("plan : ", JSON.stringify(plan, null, 2));

    let context = "";
    for (const step of plan.steps){
        const result = await executeStep(step, context);
        context += `\n[Step ${step.id}: ${step.action} ] ${result}`;
    }
    console.log("\n final output ", context)
}

runAgent("Summarize recent research on AI in medicine");


