type ButtonType = 'BtnPrimary' | 'BtnDanger' | 'BtnSecondary'
type ButtonSizeType = 'BtnSmall' | 'BtnMedium' | 'BtnBig'

export interface ButtonPropsType {
	btnType: ButtonType
	btnSize?: ButtonSizeType
	label: String
	disabled?: boolean
	clicked: () => void
}