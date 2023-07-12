interface ValidatorAgentType {
    value?: number | string | boolean | RegExp
    message?: string
}

export interface InputValidationType {
    required?: ValidatorAgentType
    maxLength?: ValidatorAgentType
    pattern?: ValidatorAgentType
}

export interface ElementConfigType {
    type: string
    placeholder: string
}

export interface ValidationResultType {
    type: string
    message: string
}