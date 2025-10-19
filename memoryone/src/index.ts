import OpenAI from 'openai'
import dotenv from 'dotenv'
import readline from 'readline'
import {memory} from './memory.js'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

async function main(question: string){
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages : [
            { role: "system", content: "you are a helpful assistant"},
            ...memory.history,
            { role: "user", content: question}
        ]
    })
    const reply = response?.choices[0]?.message?.content
    console.log(reply);

    // add assistant's reply to memory
    memory.history.push({ role: "assistant", content: reply})
}

function askQuestion() {
    rl.question("you : ", async (q) => {
        await main(q);
        askQuestion();
    } )
}
askQuestion();