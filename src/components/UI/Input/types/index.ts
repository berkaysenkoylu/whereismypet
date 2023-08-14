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

interface SelectOptionsType {
    value: string
    displayValue: string
}

export interface ElementConfigType {
    type: string
    placeholder: string
    options?: SelectOptionsType[]
}

export interface ValidationResultType {
    type: string
    message: string
}