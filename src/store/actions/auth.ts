import * as actionTypes from './actionTypes';
import axiosAuth from '../../axiosUtility/axios-auth';
import type { SignupUserDataType, CreatedUserResponseType, LoginUserDataType, SuccessfulLoginResponseType } from './types';

export const signupStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    };
};

export const signupSuccess = (responseMessage: string) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        responseMessage: responseMessage
    };
};

export const signupFail = (responseMessage: string) => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        responseMessage: responseMessage
    };
};

export const signupRedirect = () => {
    return {
        type: actionTypes.SIGNUP_REDIRECT
    };
};

export const signup = (userData: SignupUserDataType) => {
    // TODO type tanımlaması yapılmalı
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (dispatch: any) => {
        dispatch(signupStart());

        axiosAuth.post<CreatedUserResponseType>('/signup', userData).then(response => {
            dispatch(signupSuccess(response.data.message));
        }).catch(error => {
            dispatch(signupFail(error.response.data.message));
        });
    };
};

export const authTimeout = (expirationTime: number) => {
    // TODO type tanımlaması yapılmalı
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (dispatch: any) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
};

export const authCheckState = () => {
    // TODO type tanımlaması yapılmalı
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return async (dispatch: any) => {
        const token = localStorage.getItem('token');

        if(token === null) {
            dispatch(logout());
        } else {
            const storedExpirationTime = localStorage.getItem('expirationTime') || '';
            const expirationDate = new Date(storedExpirationTime);
            if(expirationDate > new Date()){
                const userId = localStorage.getItem('userId');

                const response = await axiosAuth.get(`/${userId}`);
                const userData = response.data.userData;

                const autoLoginData = {
                    responseMessage: "",
                    username: userData.username,
                    userId: userData.id,
                    userImage: userData.avatarUrl,
                    userStatus: userData.status,
                    showFeedbackModal: false,
                    token
                };

                // TODO send the necessary data
                dispatch(loginSuccess(autoLoginData));
                dispatch(authTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            } else {
                dispatch(logout());
            }
        }
    }
};

export const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    };
}

export const loginSuccess = (data: SuccessfulLoginResponseType) => {
    const { responseMessage, token, username, userId, userImage, userStatus, showFeedbackModal } = data;

    return {
        type: actionTypes.LOGIN_SUCCESS,
        responseMessage,
        token,
        username,
        userId,
        userImage,
        userStatus,
        showFeedbackModal
    };
};

export const loginFail = (error: string) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        responseMessage: error
    };
};

export const login = (loginFormData: LoginUserDataType) => {
    // TODO type tanımlaması yapılmalı
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (dispatch: any) => {
        dispatch(loginStart());

        axiosAuth.post('/login', loginFormData).then(response => {
            const responseData = response.data;
            const { userData } = responseData;
            const expirationTime = (new Date(new Date().getTime() + responseData.expiresIn * 1000)).toString();
            const token = responseData.token;

            localStorage.setItem("userId", userData.id);
            localStorage.setItem("token", token);
            localStorage.setItem("expirationTime", expirationTime);

            const successfullLogin = {
                responseMessage: responseData.message,
                username: userData.username,
                userId: userData.id,
                userImage: userData.avatarUrl,
                userStatus: userData.status,
                showFeedbackModal: true,
                token
            };

            // TODO send the necessary data
            dispatch(loginSuccess(successfullLogin));
            dispatch(authTimeout(+responseData.expiresIn));
        }).catch(error => {
            dispatch(loginFail(error.response.data.message));
        })
    }
}

export const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    return {
        type: actionTypes.LOGOUT
    }
}

export const clearModal = () => {
    return {
        type: actionTypes.CLEAR_MODAL
    };
};