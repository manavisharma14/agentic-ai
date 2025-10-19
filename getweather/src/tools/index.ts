import type { Tool } from '../types.js'
import { getweathertool } from './getweatherTool.js'

export const TOOL_REGISTRY = {
    [getweathertool.schema.function.name] : getweathertool
}