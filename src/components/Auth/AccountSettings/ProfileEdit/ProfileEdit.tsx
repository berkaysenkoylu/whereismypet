import { useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';

import classes from './ProfileEdit.module.scss';
import FORM_FIELDS from './ProfileEditFormFields';
import Input from '../../../UI/Input/Input';
import type { StateType } from "../../../../store/reducers/types";

interface ProfileEditFormType {
    email: string
    firstname: string
    lastname: string
    username: string
}

const ProfileEdit = () => {
    const username: string | null = useSelector((state: StateType) => state.username);
    const firstname: string | null = useSelector((state: StateType) => state.firstname);
    const lastname: string | null = useSelector((state: StateType) => state.lastname);
    const email: string | null = useSelector((state: StateType) => state.email);
    const {
        register,
        handleSubmit,
        reset,
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

    useEffect(() => {
        reset({
            firstname: firstname ? firstname : '',
            lastname: lastname ? lastname : '',
            username: username ? username : '',
            email: email ? email : ''
        })
    }, [reset, username, firstname, lastname, email]);

    // To be used if the form is reset
    const INITIAL_USERDATA = { username, firstname, lastname, email };
    console.log(INITIAL_USERDATA)

    console.log(isValid)

    const onSubmit: SubmitHandler<ProfileEditFormType> = (data: ProfileEditFormType) => {
        console.log(data);
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
                style={{ marginBottom: "3rem" }}
            />
          );
        }
    );

    return (
        <div className={classes.ProfileEdit}>
            <h2>PROFILE DATA</h2>

            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                {formContent}
            </form>
        </div>
    )
}

export default ProfileEdit;