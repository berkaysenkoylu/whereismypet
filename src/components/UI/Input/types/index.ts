interface ValidatorAgentType {
    value?: number | string | boolean | RegExp
    message?: string
}

export interface InputValidationType {
    required?: ValidatorAgentType
    maxLength?: ValidatorAgentType
    pattern?: ValidatorAgentType
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validate?: (value: any) => any
}

export interface ElementConfigType {
    type: string
    placeholder: string
}

export interface ValidationResultType {
    type: string
    message: string
}