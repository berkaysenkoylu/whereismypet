import { useMemo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';

import FORM_FIELDS from './ProfileEditFormFields';
import { areTwoObjectsTheSame } from '../../../../utils/utilits';

import classes from './ProfileEdit.module.scss';
import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';
import type { StateType } from "../../../../store/reducers/types";
import type { ProfileEditFormType } from '../types';

interface ProfileEditPropsType {
    profileEditFormSubmitted: (profileEditData: ProfileEditFormType) => void
}

const ProfileEdit = (props: ProfileEditPropsType) => {
    const [isFormValid, setIsFormValid] = useState(false);
    const username: string | null = useSelector((state: StateType) => state.username);
    const firstname: string | null = useSelector((state: StateType) => state.firstname);
    const lastname: string | null = useSelector((state: StateType) => state.lastname);
    const email: string | null = useSelector((state: StateType) => state.email);
    const {
        register,
        handleSubmit,
        reset,
        watch,
        control,
        formState: { errors, isValid },
    } = useForm<ProfileEditFormType>({
        defaultValues: useMemo(() => {
            return {
                firstname: firstname ? firstname : '',
                lastname: lastname ? lastname : '',
                username: username ? username : '',
                email: email ? email : ''
            }
        }, [firstname, lastname, email, username]),
        mode: "onChange"
    });

    // To be used if the form is reset
    const INITIAL_USERDATA = useMemo(() => {
        return {
            username, firstname, lastname, email
        }
    }, [username, firstname, lastname, email]);

    useEffect(() => {
        reset({
            firstname: firstname ? firstname : '',
            lastname: lastname ? lastname : '',
            username: username ? username : '',
            email: email ? email : ''
        });
    }, [reset, username, firstname, lastname, email]);

    useEffect(() => {
        const subscription = watch((value) => {
            setIsFormValid(!areTwoObjectsTheSame(value, INITIAL_USERDATA) && isValid);
        });

        return () => subscription.unsubscribe();
    }, [watch, INITIAL_USERDATA, isValid]);

    useEffect(() => {
        setIsFormValid(!areTwoObjectsTheSame({ firstname, lastname, username, email }, INITIAL_USERDATA) && isValid);
    }, [firstname, lastname, username, email, INITIAL_USERDATA, isValid]);

    const onResetFormHandler = () => {
        const { firstname, lastname, username, email } = INITIAL_USERDATA;
        reset({
            firstname: firstname ? firstname : '',
            lastname: lastname ? lastname : '',
            username: username ? username : '',
            email: email ? email : ''
        });
    }

    const onSubmit: SubmitHandler<ProfileEditFormType> = (data: ProfileEditFormType) => {
        props.profileEditFormSubmitted(data);
    }

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
                style={{ marginBottom: "3rem" }}
            />
          );
        }
    );

    return (
        <div className={classes.ProfileEdit}>
            <h2>PROFILE DATA</h2>

            <form autoComplete="off">
                {formContent}
            </form>

            <div className={classes.ProfileEdit__Cta}>
                <Button
                    btnType='BtnDanger'
                    label='Reset'
                    disabled={!isFormValid} clicked={onResetFormHandler}
                />

                <Button
                    btnType='BtnCustom'
                    label='Update'
                    disabled={!isFormValid} clicked={handleSubmit(onSubmit)}
                />
            </div>
        </div>
    )
}

export default ProfileEdit;