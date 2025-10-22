import type { Tool } from './type.js' 
import {writeFileTool} from './writeFile.js'

export const TOOL_REGISTRY: Record<string, Tool> = {
    [writeFileTool.schema.function.name] : writeFileTool
}