import { useState, useEffect, useRef } from 'react';
import { connect, ConnectedComponent } from 'react-redux';

import * as actions from '../../store/actions/index';
import classes from './Authentication.module.scss';
import Signup from '../../components/Auth/Signup/Signup';
import Login from '../../components/Auth/Login/Login';
import ButtonLink from '../../components/UI/ButtonLink/ButtonLink';
import type { StateType } from '../../store/reducers/types';
import type { LoginUserDataType, SignupUserDataType } from '../../store/actions/types';

interface AuthenticationPropsType {
    isLoading: boolean
    responseMessage: string | null
    token: string | null
    isAuth: boolean
    showFeedbackModal: boolean
    successfullSignup: boolean
    successfulLogin: boolean
}

// eslint-disable-next-line react-refresh/only-export-components
const Authentication = (props: AuthenticationPropsType) => {
    const [loginMode, setLoginMode] = useState(true);
    const [optionFormClassList, setOptionFormClassList] = useState([classes.Authentication__OptionForm]);
    const toggled = useRef<boolean>(false);

    console.log(props)

    useEffect(() => {
        // Should only execute when one of the toggle buttons is pressed
        toggled.current && setOptionFormClassList([classes.Authentication__OptionForm, loginMode ? classes.Authentication__OptionForm__BounceRight : classes.Authentication__OptionForm__BounceLeft]);
    }, [loginMode]);

    const onModeChangedHandler = (isLogin: boolean) => {
        toggled.current = true;
        setLoginMode(isLogin);
    }

    const signupFormSubmittedHandler = (signupFormData: SignupUserDataType) => {
        console.log("DISPATCH SIGNUP ACTION")
        console.log(signupFormData)
    }

    const loginFormSubmittedHandler = (loginFormData: LoginUserDataType) => {
        console.log("DISPATCH LOGIN ACTION")
        console.log(loginFormData)
    }

    return (
        <section className={classes.Authentication}>
            <div className={classes.Authentication__Options}>
                <div className={classes.Authentication__OptionText}>
                    <div className={classes.Authentication__OptionText__Unregistered}>
                        <p>Not registered yet?</p>

                        <ButtonLink
                            noUnderline
                            type='LinkWhite'
                            size='Big'
                            label='<Sign Up />'
                            clicked={() => onModeChangedHandler(false)}
                        />
                    </div>
                    <div className={classes.Authentication__OptionText__Registered}>
                        <p>Already registered?</p>

                        <ButtonLink
                            noUnderline
                            type='LinkWhite'
                            size='Big'
                            label='<Login />'
                            clicked={() => onModeChangedHandler(true)}
                        />
                    </div>
                </div>

                <div className={optionFormClassList.join(" ")}>
                    {loginMode ?
                        <Login
                            loginFormSubmitted={loginFormSubmittedHandler} />
                            :
                        <Signup signupFormSubmitted={signupFormSubmittedHandler} />}
                </div>
            </div>
        </section>
    );
}

const mapStateToProps = (state: StateType) => {
    return {
        isLoading: state.isLoading,
        responseMessage: state.responseMessage,
        token: state.token,
        isAuth: state.isAuth,
        showFeedbackModal: state.showFeedbackModal,
        successfullSignup: state.successfullSignup,
        successfulLogin: state.successfulLogin
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => {
    return {
        signup: (formData: SignupUserDataType) => dispatch(actions.signup(formData)),
        login: (formData: LoginUserDataType) => dispatch(actions.login(formData)),
        clearModal: () => dispatch(actions.clearModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication) as ConnectedComponent<
    typeof Authentication,
    Partial<AuthenticationPropsType>
>;