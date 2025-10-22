// src/planner.ts
import OpenAI from "openai";
import dotenv from "dotenv";
import type { Plan } from "./types.js";

dotenv.config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generatePlan(goal: string) {
  const system =
    `
    you are a precise planning agent.
    return only JSON for a plan to acheive the user's goal.
    schema: {
      "goal" : "string",
      "steps" : [
        "id: : number,
        "action" : string,
        "details" : string,
        "type" : "model" | "summary" | "tool" | "critic" | "research"
      ]
    }
      rules: {
      - step id's start at 1 with increment
      if type is "tool" include "name" and "args"
      be consise but complete.
      }
  `
  const user = `Goal : ${goal}`

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: "system", content: system},
      { role: "user", content: user}
    ],
    temperature: 0.2,
    response_format: { type: "json_object"}
  })

  const raw = response.choices[0]?.message?.content ?? "{}";

  let plan: Plan = {goal, steps: []}

  try{
    const parsed = JSON.parse(raw);

    if(Array.isArray(parsed?.steps)) {
      plan = {
        goal: parsed.goal ?? goal,
        steps: parsed.steps.map((s: any, i: number) => ({
          id: Number(s.id ?? i+1),
          action: String(s.action ?? `step ${i+1}`),
          details: String(s.details ?? ""),
          type: s.type as any,
          name: s.name,
          args: s.args ?? {}
        }))
      } 
    }
  } catch(error){
    console.log(`error`)
  }
  return plan;
}