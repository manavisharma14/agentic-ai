import { getTimeTool } from './getTime.js';
import type { Tool } from "../types.js"

export const TOOL_REGISTRY: Record<string, Tool> = {
    [getTimeTool.schema.function.name] : getTimeTool
}