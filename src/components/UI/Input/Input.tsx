import React from 'react';
import { useController } from "react-hook-form";
import type {
    ElementConfigType,
    InputValidationType,
    ValidationResultType,
} from "./types";

import classes from './Input.module.scss';

// TODO type tanımlaması yapılmalı
interface InputPropsType {
    testid: string
    name: string
    elementConfig: ElementConfigType
    validation: InputValidationType
    // TODO: type tanımlaması yapılmalı
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control?: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validationResult?: ValidationResultType | undefined | any
    lastChild?: boolean
    isPassword?: boolean
    touched?: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    passwordValidationMap?: any
    focusLost?: () => void
}

const Input = (props: InputPropsType) => {
    const {
        testid,
        elementConfig,
        name,
        validation,
        register,
        control,
        // validationResult,
        lastChild,
        // isPassword,
        // passwordValidationMap,
        focusLost
    } = props;
    const {
        field,
        fieldState: { invalid, isTouched }
    } = useController({
        name,
        control,
        rules: { required: true }
    });
    const { placeholder } = elementConfig;
    // const { message } = validationResult;
    const { onBlur } = register(name);

    // TODO type tanımlaması yapılmalı
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onInputFocused = (event: any) => {
        console.log(event);
    };

    // TODO type tanımlaması yapılmalı
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onInputFocusLost = (event: any) => {
        // TODO revisit this.
        onBlur(event);

        typeof focusLost === "function" && focusLost();
    };

	return (
		<div className={[
            classes.InputContainer,
            !lastChild ? classes.NonLastInputContainer : "",
        ].join(" ")}>
			<input
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
            <span className={classes.InputContainer__BottomBorder}></span>
            <label>
                {placeholder}
            </label>
		</div>
	);
}

export default Input;