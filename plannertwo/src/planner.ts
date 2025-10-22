import OpenAI from 'openai'
import dotenv from 'dotenv'

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function generatePlan(goal: string){
    const prompt= 
    `
    you are a precise planner agent.
    your job is to take user goal and create a JSON plan with step by step actions
    each step should include:
    "id" : step number
    "action" : short title,
    "details" : what to do
    "type" : "model" | "tool" | "research" | "summary"

    output **ONLY** JSON (no explinations).

    example: 
    {
        "goal" : "research ai in education",
        "steps" : [
            { "id" : 1, "action": "find key trends", "details": "look up 3 major trends" , "type" : "research},
             { "id" : 2,  "action": "summarize findings" , "details": "summarize trends concisely", "type": "model"}
        ]  
    }
    Goal "${goal}"
    `;

    const res = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            { role: "system", content: prompt}
        ],
        temperature: 0.3
    })

    const raw = res.choices[0]?.message?.content ?? "{}"

    try{
        const plan = JSON.parse(raw);
        console.log("plan generated successfully")
        return plan;
    } catch (error){
        console.log("Error : ", error)
        return {goal, steps: []}
    }
}