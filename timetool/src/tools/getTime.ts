import type { Tool } from "../types.js"

export const getTimeTool : Tool= {
    schema: {
        type: "function",
        function: {
            name: "getTime",
            description: "Get the current time for a given city",
            parameters: {
                type: "object",
                properties: {
                    city: {
                        type: "string",
                        description: "the name of the city to get the time for eg new york, paris, chicago etc",
                    }
                },
                required: ["city"]
                
            }
        }
    },
    handler: async (args: {city: string}) => {
        const { city } = args;
        // demo
        const now = new Date().toLocaleTimeString("en-US");
        return `the current time in the city is ${now}`
    }
}