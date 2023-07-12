type ButtonType = 'BtnPrimary' | 'BtnDanger' | 'BtnSecondary' | 'BtnCustom'
type ButtonSizeType = 'BtnSmall' | 'BtnMedium' | 'BtnBig'

export interface ButtonPropsType {
	btnType: ButtonType
    label: String
	btnSize?: ButtonSizeType
	disabled?: boolean
	clicked?: () => void
}