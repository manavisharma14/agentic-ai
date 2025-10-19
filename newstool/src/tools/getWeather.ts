import type { Tool } from "../types";

export const getWeatherTool: Tool = {

    schema: {
        type: "function",      
        function: {
            name: "getWeather",
            description: "Fetch the weather for a given city.",
            parameters: {
                type: "object",
                properties: {
                    city: {
                        type: "string",
                        description: "name of the city to get weather for",
                    },
                    unit: {
                        type: "string",
                        description: "temperature unit: celsius or fahrenheit",
                        enum: ["celsius", "fahrenheit"],
                    },
                },
                required: ["city", "unit"],
            },
        },
    },
    handler: async (args: { city: string; unit: string }) => {
        const { city, unit } = args;
        // imagine calling a real weather API here
        const temperature = unit === "celsius" ? "24°C" : "75°F";
        return `The weather in ${city} is ${temperature}`;
    },
};
