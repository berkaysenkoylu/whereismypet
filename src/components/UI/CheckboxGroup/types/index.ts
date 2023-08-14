export interface CheckboxItemsType {
    name: string
    checked: boolean
}

export interface CheckboxGroupPropsType {
    label: string
    items: CheckboxItemsType[]
    onItemChecked: (itemName: string) => void
}