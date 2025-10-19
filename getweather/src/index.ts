import OpenAI from 'openai'
import dotenv from 'dotenv'
import { TOOL_REGISTRY } from './tools/index.js'
import readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

async function ask(question: string){
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "system", content: "you are a helpful assistant"},
            { role: "user", content: question}
        ],
        tools: Object.values(TOOL_REGISTRY).map(tool => tool.schema),
        tool_choice: "auto"
    })

    const message = response?.choices[0]?.message?.content;

    const toolCall = response.choices[0]?.message.tool_calls?.[0];
    if(toolCall && toolCall.type === "function"){
        const toolName = toolCall.function.name;
        const toolArgs = JSON.parse(toolCall.function.arguments);

        const selectedTool = TOOL_REGISTRY[toolName];
        const toolResult = await selectedTool?.handler(toolArgs);

        const followup = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "you are a helpful assistant"},
                { role: "user", content: question},
                { role: "assistant", tool_calls: [toolCall]},
                { role: "tool", tool_call_id: toolCall.id, content: toolResult ?? ""}

            ]
        })
        console.log(`message from tool : ${followup?.choices[0]?.message.content}`)
    }
    else{
        console.log("direct message: ", message);
    }
}

function main(){
    rl.question ("user : ", async(q) => {
        if(q.toLowerCase() === "exit"){
            rl.close();
            return;
        }
        await ask(q);
        main();
    })
}

main();