import fs from 'fs'

const MEMORY_FILE = './memory.json'

function loadMemory(){
    try{
        const data = fs.readFileSync(MEMORY_FILE, "utf-8");
        console.log("memory loaded from file")
        return JSON.parse(data);
    }
    catch {
        console.log("no memory found, starting fresh");
        return { history: [], userConetext: {}}
    }
}

function saveMemory(memory: any){
    fs.writeFileSync(MEMORY_FILE, JSON.stringify(memory, null, 2));
}

function trimMemory(memory: any, limit: number){
    if(memory.history.length > limit){
        memory.history = memory.history.slice(-limit)
    }
}

export const memory = loadMemory();

export function updateMemory(role: string, content: string){
    memory.history.push({role, content});
    trimMemory(memory, 10);
    saveMemory(memory);
    console.log(`saved memory [${role}] ${content}`)
}

export function clearMemory(){
    memory.history = [];
    memory.userContect = {};
    saveMemory(memory);
    console.log(`memory cleared!`)
}