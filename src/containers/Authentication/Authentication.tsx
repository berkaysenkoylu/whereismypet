import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as actions from '../../store/actions/index';
import classes from './Authentication.module.scss';
import Signup from '../../components/Auth/Signup/Signup';
import Login from '../../components/Auth/Login/Login';
import ButtonLink from '../../components/UI/ButtonLink/ButtonLink';
import AuthFeedback from '../../components/Auth/AuthFeedback/AuthFeedback';
import type { StateType } from '../../store/reducers/types/index';
import type { LoginUserDataType, SignupUserDataType } from '../../store/actions/types';

interface AuthenticationPropsType {
    isLoading: boolean
    responseMessage: string | null
    token: string | null
    isAuth: boolean
    showFeedbackModal: boolean
    successfullSignup: boolean
    successfullLogin: boolean
    login: (loginFormData: LoginUserDataType) => void
    signup: (signupFormData: SignupUserDataType) => void
    clearModal: () => void
}

const Authentication = (props: AuthenticationPropsType) => {
    const [loginMode, setLoginMode] = useState(true);
    const [optionFormClassList, setOptionFormClassList] = useState([classes.Authentication__OptionForm]);
    const navigate = useNavigate();
    const toggled = useRef<boolean>(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
    const navigateTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current);
            clearTimeout(navigateTimeoutRef.current);
        }
    }, []);
    
    useEffect(() => {
        // Should only execute when one of the toggle buttons is pressed
        toggled.current && setOptionFormClassList([classes.Authentication__OptionForm, loginMode ? classes.Authentication__OptionForm__BounceRight : classes.Authentication__OptionForm__BounceLeft]);
    }, [loginMode]);

    const onModeChangedHandler = (isLogin: boolean) => {
        toggled.current = true;
        setLoginMode(isLogin);
    }

    const signupFormSubmittedHandler = (signupFormData: SignupUserDataType) => {
        props.signup(signupFormData);
    }

    const loginFormSubmittedHandler = (loginFormData: LoginUserDataType) => {
        props.login(loginFormData);
    }

    const onCloseFeedbackModalHandler = (path: string | null) => {
        timeoutRef.current = setTimeout(() => {
            props.clearModal();

            if (props.successfullSignup) {
                setLoginMode(true);
            }

            if (path !== null) {
                navigateTimeoutRef.current = setTimeout(() => {
                    navigate(path);
                }, 200);
            }
        }, 220);
    }

    return (
        <>
            <AuthFeedback
                showModal={props.showFeedbackModal}
                isSuccess={props.successfullLogin || props.successfullSignup}
                closeFeedback={() => onCloseFeedbackModalHandler(props.successfullLogin ? '/' : null)}
                message={props.responseMessage}
            />
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
        </>
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
        successfullLogin: state.successfullLogin
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

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);