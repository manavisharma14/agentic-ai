import { PlannerAgent } from "./agents/plannerAgent.js";
import { ResearcherAgent } from "./agents/researcherAgent.js";
import { SummarizerAgent } from "./agents/summarizerAgent.js";
import { CriticAgent } from "./agents/criticAgent.js";
import { executeWorkflow } from "./orchestrator.js";

async function main() {
  console.log("\n🤖 Starting multi-agent system...\n");

  // 🧩 Initialize agents
  const agents = {
    planner: new PlannerAgent(),
    researcher: new ResearcherAgent(),
    summarizer: new SummarizerAgent(),
    critic: new CriticAgent(),
  };

  // 🎯 User goal (you can change this anytime)
  const goal = "Create a 3-day schedule to learn FastAPI for backend development";

  // 🚀 Execute full workflow
  const result = await executeWorkflow(goal, agents);

  console.log("\n\n===============================");
  console.log("📋 FINAL OUTPUT");
  console.log("===============================");
  console.log(`🧩 Plan:\n${result.plan}\n`);
  console.log(`🧠 Summary:\n${result.summary}\n`);
  console.log(`🧐 Critique:\n${result.critique}\n`);
  console.log("===============================\n");
}

// Run main
main().catch((err) => console.error("❌ Error:", err));