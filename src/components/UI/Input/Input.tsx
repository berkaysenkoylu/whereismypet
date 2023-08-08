import { useController } from 'react-hook-form';
import type {
    ElementConfigType,
    InputValidationType,
    ValidationResultType
} from './types';
import { FieldError } from 'react-hook-form';

import classes from './Input.module.scss';

// TODO type tanımlaması yapılmalı
interface InputPropsType {
    testid: string
    name: string
    elementType: string
    elementConfig: ElementConfigType
    validation: InputValidationType
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control?: any
    validationResult?: ValidationResultType | FieldError | Record<string, never>
    lastChild?: boolean
    touched?: boolean
    style?: React.CSSProperties
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    passwordValidationMap?: any
    onFocus?: () => void
    focusLost?: () => void
}

const Input = (props: InputPropsType) => {
    const {
        testid,
        elementType,
        elementConfig,
        name,
        validation,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        register,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        control,
        validationResult,
        lastChild,
        style,
        onFocus,
        focusLost
    } = props;
    const {
        field,
        fieldState: { invalid, isTouched }
    } = useController({
        name,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        control,
        rules: { required: true }
    });
    const { placeholder } = elementConfig;
    const { message } = validationResult;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const { onBlur } = register(name);

    const onInputFocused = () => {
        typeof onFocus === "function" && onFocus();
    };

    // TODO type tanımlaması yapılmalı
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onInputFocusLost = (event: any) => {
        // TODO revisit this.
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        onBlur(event);
      
        typeof focusLost === "function" && focusLost();
    };

    let inputElement = null;

    switch(elementType) {
        case 'input':
            inputElement = <input
                data-testid={testid}
                {...field}
                {...elementConfig}
                {...register(name, validation)}
                className={[
                    classes.InputContainer__Input,
                    invalid && isTouched ? classes.InvalidInput : "",
                ].join(" ")}
                onBlur={onInputFocusLost}
                onFocus={onInputFocused}
            />
            break;
        case 'textarea':
            inputElement = <textarea
                {...field}
                {...elementConfig}
                {...register(name, validation)}
                className={[
                    classes.InputContainer__Input,
                    classes.TextArea,
                    invalid && isTouched ? classes.InvalidInput : "",
                ].join(' ')} 
                {...props.elementConfig}
            />;
            break;
        default:
            console.error('Something wrong with your input element!');
            break;
    }

	return (
		<div className={[
            classes.InputContainer,
            !lastChild ? classes.NonLastInputContainer : "",
        ].join(" ")} style={style}>
            <span
                className={[
                classes.ValidationError,
                isTouched && invalid && message && message !== ""
                    ? classes.ShowValidationError
                    : null,
                ].join(" ")}
            >
                {message}
            </span>
			{inputElement}
            <span className={classes.InputContainer__BottomBorder} style={elementType === 'textarea' ? {bottom: '2px'} : {}}></span>
            <label>
                {placeholder}
            </label>
		</div>
	);
}

export default Input;