import type {Tool } from "../types.js"

export const mathTool : Tool = {
    schema: {
        type: "function",
        function: {
            name: "mathop",
            description: "perform the basic arithimatic operation of two numbers",
            parameters: {
                type: "object",
                properties: {
                    a: {
                        type: "number",
                        description: "the first number you are supposed to perfom operation on"
                    },
                    b: {
                        type: "number",
                        description: "the second number you are supposed to perfom operation on"
                    },
                    op: {
                        type: "string",
                        description: "the operation you are supposed to perform"
                    }
                },
                required: ["a", "b", "op"]
            }
        }
    },
    handler: async(args: any) => {
        const { a, b, op} = args;
        switch(op){
            case "+" : 
                return `${a + b}`
            case "-" : 
                return `${a - b}`
            case "*" :
                return `${a * b}`
            case '/':
                if(b === 0) {return "invalid operation. can't divide by zero"}
                else return `${a/b}`
            default: 
                return `error : invalid operation`
        }
    }   
}