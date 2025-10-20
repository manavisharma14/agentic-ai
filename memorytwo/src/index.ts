import OpenAI from 'openai'
import dotenv from 'dotenv'
import readline from 'readline'
import { memory, updateMemory, clearMemory} from './memory.js'


dotenv.config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function main(question: string){
    updateMemory("user", question);
    const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            { role : "system", content: "you are a helpful assistant"},
            { role: "system", content: `user context ${JSON.stringify(memory.userContext)}`},
            ...memory.history,
            { role: "user", content: question},
            

        ]
    })
    const answer = response?.choices[0]?.message?.content || "no response"
    updateMemory("assistant", answer)
    console.log(`assistant's reply : ${answer}`)
}

function askquestion(){
    rl.question("you : ",async(q) => {
        if(q.toLowerCase().trim() === "exit"){
            console.log("goodbye");
            return;
        }

        if(q.toLowerCase() === "clear memory"){
            clearMemory();
            askquestion();
            return;
        }
        await main(q);
        askquestion();
    })
}
askquestion();