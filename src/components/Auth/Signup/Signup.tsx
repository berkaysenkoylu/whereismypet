import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import usePasswordValidation from '../../../hooks/usePasswordValidation';
import FORM_FIELDS from './SignupFields';
import classes from './Signup.module.scss';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import PasswordFeedback from '../PasswordFeedback/PasswordFeedback';
import { SignupUserDataType } from '../../../store/actions/types';

interface SignupPropsType {
    // signupSuccess: boolean;
    // showFeedbackModal: boolean;
    // modalMessage: string;
    // clearModal: () => void;
    signupFormSubmitted: (formData: SignupUserDataType) => void;
}

const Signup = (props: SignupPropsType) => {
    const [classList, setClassList] = useState([classes.Signup]);
    const [isPasswordFeedbackVisible, setIsPasswordFeedbackVisible] = useState(false);
    const {
        register,
        watch,
        handleSubmit,
        control,
        formState: { errors, isValid },
    } = useForm<SignupUserDataType>({
        defaultValues: {
          firstname: "",
          lastname: "",
          username: "",
          email: "",
          password: "",
        },
        mode: "onChange"
    });
    const [validLength, hasNumber, upperCase, specialChar] = usePasswordValidation(watch("password"));

    useEffect(() => {
        setClassList([classes.Signup, classes.Signup__Show]);
    }, []);

    const onSubmit: SubmitHandler<SignupUserDataType> = (data) => {
        props.signupFormSubmitted(data);
    };

    const onPasswordFeedbackToggled = () => {
        if (isPasswordFeedbackVisible) {
            setIsPasswordFeedbackVisible(prevState => !prevState);
        } else {
            setIsPasswordFeedbackVisible(prevState => !prevState);
        }
    }

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
                onFocus={formField === "password" ? onPasswordFeedbackToggled : () => {}}
                focusLost={formField === "password" ? onPasswordFeedbackToggled : () => {}}
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
                        disabled={!isValid}
                    />
                </div>
            </form>

            <PasswordFeedback
                validation={{ validLength, hasNumber, upperCase, specialChar }}
                visible={isPasswordFeedbackVisible} />
        </div>
    );
}

export default Signup;