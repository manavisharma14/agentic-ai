import OpenAI from 'openai'
import dotenv from 'dotenv'

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function executeStep(step: any, context=""){
    console.log(`executing step ${step.id} : ${step.action}`);

    const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            { role: "system", content: " you are a focussed executor for planner steps."},
            { role: "user", content: `context so far :\n ${context} \n\n now perform this step: \n ${step.details}`}
        ]
    });
    const output = response.choices[0]?.message?.content?.trim() || "";
    console.log(`step ${step.id} completed`);
    return output;
}