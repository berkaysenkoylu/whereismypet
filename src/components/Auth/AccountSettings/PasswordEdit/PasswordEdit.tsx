import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';

import FORM_FIELDS from './PasswordEditFormFields';
import classes from './PasswordEdit.module.scss';
import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';
import usePasswordValidation from '../../../../hooks/usePasswordValidation';
import PasswordFeedback from '../../PasswordFeedback/PasswordFeedback';
import type { PasswordEditFormType } from '../types';
import type { StateType } from '../../../../store/reducers/types';

interface PasswordEditPropsType {
    passwordEditFormSubmitted: (data: PasswordEditFormType) => void
}

const PasswordEdit = (props: PasswordEditPropsType) => {
    const responseMessage: string | null = useSelector((state: StateType) => state.responseMessage);
    const isError: boolean = useSelector((state: StateType) => state.isError);
    const [isPasswordFeedbackVisible, setIsPasswordFeedbackVisible] = useState(false);
    const [showPasswordErrorClassList, setShowPasswordErrorClassList] = useState([classes.PasswordEdit__Error]);
    const {
        register,
        watch,
        reset,
        handleSubmit,
        control,
        formState: { errors, isValid, touchedFields },
    } = useForm<PasswordEditFormType>({
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        },
        mode: "onChange"
    });
    const [validLength, hasNumber, upperCase, specialChar] = usePasswordValidation(watch("newPassword"));

    const newPassword = watch("newPassword");
    const confirmPassword = watch("confirmPassword");

    useEffect(() => {
        if (newPassword !== confirmPassword) {
            setShowPasswordErrorClassList([classes.PasswordEdit__Error, classes.PasswordEdit__Error__Show]);
        } else {
            setShowPasswordErrorClassList([classes.PasswordEdit__Error]);
        }
    }, [newPassword, confirmPassword, touchedFields]);

    useEffect(() => {
        if (responseMessage && responseMessage !== '' && !isError) {
            reset({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
        }
    }, [responseMessage, isError, reset]);

    const onResetFormHandler = () => {
        reset({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        });
    }

    const onPasswordFeedbackToggled = () => {
        if (isPasswordFeedbackVisible) {
            setIsPasswordFeedbackVisible(prevState => !prevState);
        } else {
            setIsPasswordFeedbackVisible(prevState => !prevState);
        }
    }

    const onSubmit: SubmitHandler<PasswordEditFormType> = (data: PasswordEditFormType) => {
        props.passwordEditFormSubmitted(data);
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
                    onFocus={formField === "newPassword" ? onPasswordFeedbackToggled : () => {}}
                    focusLost={formField === "newPassword" ? onPasswordFeedbackToggled : () => {}}
                />
            );
        }
    );

    return (
        <div className={classes.PasswordEdit}>
            <h2>CHANGE PASSWORD</h2>

            <form autoComplete="off">
                {formContent}
            </form>

            <PasswordFeedback
                validation={{ validLength, hasNumber, upperCase, specialChar }}
                visible={isPasswordFeedbackVisible}
                style={{
                    bottom: '-6rem'
                }}
            />

            <div className={classes.PasswordEdit__Cta}>
                <Button
                    btnType='BtnDanger'
                    label='Reset'
                    disabled={!isValid} clicked={onResetFormHandler}
                />

                <Button
                    btnType='BtnCustom'
                    label='Update'
                    disabled={!isValid} clicked={handleSubmit(onSubmit)}
                />

                <p className={showPasswordErrorClassList.join(' ')}>Passwords don't match!</p>
            </div>
        </div>
    );
}

export default PasswordEdit;