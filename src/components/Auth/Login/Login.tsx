import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import classes from './Login.module.scss';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import ButtonLink from '../../UI/ButtonLink/ButtonLink';

interface LoginFormType {
    email: string;
    password: string;
}

interface LoginPropsType {
    loginFormSubmitted: (formData : LoginFormType) => void
}

const FORM_FIELDS = {
    email: {
        elementType: 'input',
        elementConfig: {
            type: "text",
            placeholder: "Email",
        },
        validation: {
            required: { value: true, message: "This field is required" },
            pattern: { value: /^\S+@\S+$/i, message: "Email form is not correct" },
        }
    },
    password: {
        elementType: 'input',
        elementConfig: {
            type: "password",
            placeholder: "Password",
        },
        validation: {
            required: { value: true, message: "This field is required" },
        }
    }
};

const Login = (props: LoginPropsType) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isValid },
    } = useForm<LoginFormType>({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange"
    });
    const [classList, setClassList] = useState([classes.Login]);

    useEffect(() => {
        setClassList([classes.Login, classes.Login__Show]);
    }, []);

    const onSubmit: SubmitHandler<LoginFormType> = (data) => {
        props.loginFormSubmitted(data);
    };

    const formContent = Object.keys(FORM_FIELDS).map(
        (formField: string, index: number) => {
          const { elementType, elementConfig, validation } =
            FORM_FIELDS[formField as keyof typeof FORM_FIELDS];
    
          return (
            <Input
                testid={`testid-${formField}`}
                key={formField}
                elementType={elementType}
                elementConfig={elementConfig}
                name={formField}
                register={register}
                validation={validation}
                control={control}
                validationResult={errors[formField as keyof typeof FORM_FIELDS] || {}}
                lastChild={index === Object.keys(FORM_FIELDS).length - 1}
            />
          );
        }
    );

    return (
        <div className={classList.join(" ")}>
            <h2>LOGIN</h2>

            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                {formContent}

                <div className={classes.Login__Cta}>
                    <ButtonLink
                        type='LinkCustom'
                        label='Forgot your password?'
                        clicked={() => {}}
                    />

                    <Button
                        btnType='BtnCustom'
                        btnSize='BtnSmall'
                        label='Login'
                        disabled={!isValid}
                    />
                </div>
            </form>
        </div>
    );
}

export default Login;