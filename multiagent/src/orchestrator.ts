import { systemCritic } from './agents/critic'
import { systemPlanner } from './agents/planner'
import { systemResearcher } from './agents/researcher'
import { systemSummarizer } from './agents/summarizer'

export class Orchestrator {
    async run(goal: string){
        console.log(`goal received :${goal} `)

        // step 1 planning
        const plan = await systemPlanner.run(goal);
        console.log(`\nplan\n : ${plan.output}`)

        //step 2 research
        const research = await systemResearcher.run(plan.output)
        console.log(`research : ${research.output}`)

        // step 3 
        const summary = await systemSummarizer.run(research.output)
        console.log(`summary : ${summary.output}`)

        // step 4 
        const critique = await systemCritic.run(summary.output)
        console.log(`critique : ${critique.output}`)

        // return everyhtng neatly
        return {
            goal, 
            plan: plan.output,
            research: research.output,
            summary: summary.output,
            critique: critique.output
        }
    }
}