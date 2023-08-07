type ButtonType = 'BtnPrimary' | 'BtnDanger' | 'BtnSecondary' | 'BtnCustom'
type ButtonSizeType = 'BtnSmall' | 'BtnMedium' | 'BtnBig'

export interface ButtonPropsType {
	btnType: ButtonType
    label: string
	btnSize?: ButtonSizeType
	disabled?: boolean
	clicked?: (e: React.MouseEvent<HTMLElement> | undefined) => void
}