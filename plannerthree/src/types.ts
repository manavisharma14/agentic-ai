export type StepType = "model" | "summary" | "tool" | "cirtic" | "research"

export type PlanStep = {
    id: number,
    action: string,
    details: string,
    type: StepType,
    name?: string,
    args?: Record<string,any> 
}

export type Plan = {
    goal: string,
    steps: PlanStep[]
}

export type StepResult = {
    stepId: number,
    ok: boolean,
    output: string,
    error?: string
}

export type RunResult = {
    plan: Plan,
    results: StepResult,
    finalContext: string
}