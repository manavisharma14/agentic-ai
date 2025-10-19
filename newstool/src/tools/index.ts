import { getWeatherTool } from './getWeather'
import type { Tool } from "../types"
 
export const TOOL_REGISTRY: Record<string, Tool> = {
    [getWeatherTool.schema.function.name]: getWeatherTool,
}