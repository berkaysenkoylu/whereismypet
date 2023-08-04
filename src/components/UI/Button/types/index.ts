type ButtonType = 'BtnPrimary' | 'BtnDanger' | 'BtnSecondary' | 'BtnCustom'
type ButtonSizeType = 'BtnSmall' | 'BtnMedium' | 'BtnBig'

export interface ButtonPropsType {
	btnType: ButtonType
    label: string
	btnSize?: ButtonSizeType
	disabled?: boolean
	// eslint-disable-next-line no-unused-vars
	clicked?: (e: React.MouseEvent<HTMLElement> | undefined) => void
}