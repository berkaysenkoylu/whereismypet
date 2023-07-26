import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";

import FORM_FIELDS from './SignupFields';
import classes from './Signup.module.scss';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

interface SignupFormType {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

interface SignupPropsType {
    // signupSuccess: boolean;
    // showFeedbackModal: boolean;
    // modalMessage: string;
    // clearModal: () => void;
    // eslint-disable-next-line no-unused-vars
    signupFormSubmitted: (formData: SignupFormType) => void;
}

const Signup = (props: SignupPropsType) => {
    const [classList, setClassList] = useState([classes.Signup]);
    const {
        register,
        /*watch,*/
        handleSubmit,
        control,
        // eslint-disable-next-line no-unused-vars
        formState: { errors, /*isValid, touchedFields*/ },
    } = useForm<SignupFormType>({
        defaultValues: {
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
        },
        mode: "onChange"
    });

    useEffect(() => {
        setClassList([classes.Signup, classes.Signup__Show]);
    }, []);

    const onSubmit: SubmitHandler<SignupFormType> = (data) => {
        props.signupFormSubmitted(data);
    };

    const formContent = Object.keys(FORM_FIELDS).map(
        (formField: string, index: number) => {
          const { elementConfig, validation } =
            FORM_FIELDS[formField as keyof typeof FORM_FIELDS];
    
          return (
            <Input
                testid={`testid-${formField}`}
                key={formField}
                elementConfig={elementConfig}
                name={formField}
                register={register}
                validation={validation}
                control={control}
                validationResult={errors[formField as keyof typeof FORM_FIELDS] || {}}
                lastChild={index === Object.keys(FORM_FIELDS).length - 1}
                style={{ marginBottom: "2rem" }}
            />
          );
        }
    );

    return (
        <div className={classList.join(" ")}>
            <h2>SIGN UP</h2>

            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                {formContent}

                <div className={classes.Signup__Cta}>
                    <Button
                        btnType='BtnCustom'
                        btnSize='BtnSmall'
                        label='Sign up'
                    />
                </div>
            </form>
        </div>
    );
}

export default Signup;