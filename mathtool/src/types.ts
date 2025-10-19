export type ToolSchema = {
    type: "function",
    function: {
        name: string,
        description: string,
        parameters: Record<string, any>;
    }
}

export type ToolHandler = (args: any) => Promise<string> | string;

export type Tool = {
    schema: ToolSchema;
    handler: ToolHandler;
}