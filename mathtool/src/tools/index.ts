import type { Tool } from "../types.js" 
import { mathTool } from "./mathTool.js"

export const TOOL_REGISTRY: Record<string, Tool> = {
    [mathTool.schema.function.name] : mathTool
}