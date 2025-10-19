import type { Tool } from "../../src/types.ts";

export const fetchNewsTool: Tool = {
    schema: {
      type: "function",
      function: {
        name: "fetch_news",
        description: "Fetch latest news headlines for a given topic",
        parameters: {
          type: "object",
          properties: {
            topic: {
              type: "string",
              description: "The topic to search for (e.g. technology, sports)",
            },
          },
          required: ["topic"],
        },
      },
    },
    handler: async (args : any) => {
      const { topic } = args;
      const fakeNews = [
        { title: `Big breakthrough in ${topic}`, url: "https://example.com/1" },
      ];
      return JSON.stringify(fakeNews);
    },
  };