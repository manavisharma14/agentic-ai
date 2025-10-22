import { Orchestrator } from './orchestrator'

async function main(){

    const orchestrator = new Orchestrator();
    const goal = "Create a weekend study plan for learning basic AI and machine learning.";

    const results = orchestrator.run(goal);
    console.log(`\n final results: `)
    console.log(JSON.stringify(results, null, 2));
}

main();