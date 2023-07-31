interface ValidationItemType {
    label: string
    value: boolean
}

export interface ValidationMapType {
    validLength: ValidationItemType
    upperCase: ValidationItemType
    hasNumber: ValidationItemType
    specialChar: ValidationItemType
}