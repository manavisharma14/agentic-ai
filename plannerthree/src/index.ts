// src/index.ts
import { generatePlan } from "./planner.js";
import { executePlan } from "./executor.js";

async function run() {
  const goal = "Find the latest AI trends, summarize them, and save to a file.";
  console.log("🎯 Goal:", goal);

  const plan = await generatePlan(goal);
  console.log("🧭 Plan:\n", JSON.stringify(plan, null, 2));

  const { results, finalContext } = await executePlan(plan);

  console.log("\n📊 Step Results:");
  for (const r of results) {
    console.log(`- Step ${r.stepId}: ${r.ok ? "OK" : `ERR: ${r.error}`}`);
  }

  console.log("\n🧠 Final Context:\n", finalContext);
}

run().catch(console.error);