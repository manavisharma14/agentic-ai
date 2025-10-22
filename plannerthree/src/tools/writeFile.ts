import type {Tool} from './type.js'
import fs from 'fs'

export const writeFileTool: Tool = {
    schema: {
        type:"function",
        function: {
            name: "write_file",
            description: "write content to a local file",
            parameters: {
                type: "object",
                properties: {
                    filename: { type: "string", description: "relative path eg output.tsx"},
                    content: { type: "string", description: "text to write"}
                },
                required: ["filename", "content"]
            },
        }
    },
    handler: (args: any) => {
        const { filename, content } = args;
        fs.writeFileSync(filename, content, "utf-8");
        return `wrote ${filename} (${content.length}) chars `
    }
}