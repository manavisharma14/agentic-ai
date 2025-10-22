// src/executor.ts
import OpenAI from "openai";
import dotenv from "dotenv";
import type { Plan, StepResult } from "./types.js";
import { TOOL_REGISTRY } from "./tools/registry.js";

dotenv.config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function withRetry<T>(fn: () => Promise<T>, tries = 2, delayMs = 400) : Promise<T> {
    let lastErr : any;
    for(let i=0; i<tries; i++){
        try {
            return await fn();
        } catch (error){
            lastErr = error;
            if(i<tries-1) await new Promise(r => setTimeout(r, delayMs))
        }
    }
    throw lastErr;
}

export async function executePlan(plan: Plan){
    const results: StepResult[] =[];
    let context = `goal ${plan.goal}`

    for(const step of plan.steps){
        console.log(`\n step ${step.id} : ${step.action} (${step.type})`);
        try{

        let output = '';

        if(step.type === "tool" && step.name){
            const tool = TOOL_REGISTRY[step.name]
            if(!tool){
                throw new Error(`tool not found ${step.name}`)
            }
            const res = await tool.handler(step.args ?? {})
            output = typeof res === "string" ? res : JSON.stringify(res);
        }
        else {
            const system = `you are a focussed executor for planned steps`
            const user = `context so far :\n ${context} \n\n Perform this step : ${step.details}`

            const response = await withRetry(() => 
                openai.chat.completions.create({
                    model: 'gpt-4o-mini',
                    messages: [
                        { role: "system", content: system },
                        { role: "user", content: user },
                    ],
                    temperature: 0.2
                }),
                2, 
                400 
            );

            output = response.choices[0]?.message.content ?? "";
            
        }
        context += `\n [step ${step.id} : ${step.action}] ${output}`
        results.push({ stepId: step.id, ok: true, output})
        console.log(`done ${step.action}`)
        }
        catch(err: any){
            const error = String (err?.message ?? err);
            results.push({stepId: step.id, ok: false, output: "", error})
        }
    }
    return {results, finalContext: context}
   
}