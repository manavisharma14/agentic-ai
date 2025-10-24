import fs from 'fs'
import path from 'path'
import OpenAI from 'openai'

const memoryDir = path.resolve("data");
const memoryFile = path.join(memoryDir, "memory.json");

if(!fs.existsSync(memoryDir)){
    fs.mkdirSync(memoryDir);
}

if(!fs.existsSync(memoryFile)){
    fs.writeFileSync(memoryFile, JSON.stringify([]));
}

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  export async function embedText(text: string): Promise<number[]> {
    const response = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });

    const embedding = response?.data?.[0]?.embedding;
    if(!embedding) {
        throw new Error("failed to generate embedding")
    }
  
    // Return the embedding safely
    return embedding;
  }
  

export async function storeMemory(entry: string){
    const embedding = await embedText(entry);
    const memories = JSON.parse(fs.readFileSync(memoryFile, "utf-8"));

    memories.push({ entry, embedding });
    fs.writeFileSync(memoryFile, JSON.stringify(memories, null, 2))
}

function cosineSimilarity(a: number[], b: number[]) : number {
    const dot = a.reduce((sum, ai, i) => sum + ai * (b[i] ?? 0), 0);
    const normA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
    const normB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
    return dot / (normA * normB)
}


export async function retrieveReleventMemories(query : string, topK = 3) : Promise<string[]> {
    const queryEmbedding = await embedText(query);
    const memories = JSON.parse(fs.readFileSync(memoryFile, "utf-8"))

    if(!Array.isArray(memories) || memories.length === 0) return [];

    const scored = memories.map((m:any) => ({
        entry: m.entry,
        score: cosineSimilarity(queryEmbedding, m.embedding),
    }))
    .sort((a,b) => b.score - a.score)
    .slice(0, topK);

    return scored.map((s) => s.entry)
}