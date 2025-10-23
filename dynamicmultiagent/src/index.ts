import dotenv from 'dotenv'
import { executeWorkflow } from './orchestrator.js'

import { systemPlanner } from "./agents/systemPlanner.js";
import { systemResearcher } from "./agents/systemResearcher.js";
import { systemSummarizer } from "./agents/systemSummarizer.js";
import { systemCritic } from "./agents/systemCritic.js";

dotenv.config();


const agents = {
    planner: systemPlanner,
    researcher: systemResearcher,
    summarizer: systemSummarizer,
    critic: systemCritic
  };

async function main(){
    const goal = "Create a weekend study plan for learning basic AI and machine learning.";

    const results = await executeWorkflow(goal, agents);

    if(!results){
        return "";
    }

    console.log("final results")
    console.log("plan : ", results.plan);
    console.log("summary : ", results.summary);
    console.log("critique : ", results.critique)


}

main().catch(console.error)