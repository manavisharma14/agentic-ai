import OpenAI from 'openai'
import dotenv from 'dotenv'
import { TOOL_REGISTRY } from './tools/index.js'

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

async function main(){
    const userMessage = "what is the time in India now?"
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "system", content: "you are a helpful assistant"},
            { role: "user", content: userMessage}
        ],
        tools: Object.values(TOOL_REGISTRY).map(tool => tool.schema),
        tool_choice: "auto"
    });
    const message = response.choices[0]?.message.content;

    const toolCall = response?.choices[0]?.message?.tool_calls?.[0]
    if(toolCall && toolCall.type === "function"){
        const toolName = toolCall.function.name;
        const toolArgs = JSON.parse(toolCall.function.arguments);

        const selectedTool = TOOL_REGISTRY[toolName];
        const toolResult = await selectedTool?.handler(toolArgs);

        const followup = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "you are a helpful assistant"},
                { role: "user", content: userMessage},
                { role: "assistant", tool_calls: [toolCall]},
                { role: "tool", tool_call_id: toolCall.id, content: toolResult ?? ""}
            ]
        })
        console.log("follow up message : ", followup.choices[0]?.message.content)
    }

    else{
        console.log("direct message : ", message);
    }
}
main();