import type { StateType, ActionType } from "./types";
import * as actionTypes from "../actions/actionTypes";

const initialState: StateType = {
    isLoading: true,
    responseMessage: null,
    token: null,
    isAuth: false,
    firstname: null,
    lastname: null,
    email: null,
    username: null,
    userId: null,
    userImage: null,
    showFeedbackModal: false,
    successfullSignup: false,
    successfullLogin: false,
    isError: false
};

const updateObject = (oldObject: StateType, updatedProperties: Partial<StateType>): StateType => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

const reducer = (state: StateType = initialState, action: ActionType): StateType => {
    switch (action.type) {
        case actionTypes.SIGNUP_START:
            return updateObject(state, {
                isLoading: true,
                responseMessage: null,
                showFeedbackModal: false,
                successfullSignup: false
            });
        case actionTypes.SIGNUP_SUCCESS:
            return updateObject(state, {
                isLoading: false,
                responseMessage: action.responseMessage,
                showFeedbackModal: true,
                successfullSignup: true
            });
        case actionTypes.SIGNUP_FAIL:
            return updateObject(state, {
                isLoading: false,
                responseMessage: action.responseMessage,
                showFeedbackModal: true,
                successfullSignup: false
            });
        case actionTypes.LOGIN_START:
            return updateObject(state, {
                isLoading: true,
                responseMessage: null,
                showFeedbackModal: false
            });
        case actionTypes.LOGIN_SUCCESS:
            return updateObject(state, {
                isLoading: false,
                successfullLogin: true,
                isAuth: true,
                showFeedbackModal: action.showFeedbackModal,
                responseMessage: action.responseMessage,
                userId: action.userId,
                token: action.token,
                username: action.username,
                firstname: action.firstname,
                lastname: action.lastname,
                email: action.email,
                userImage: action.userImage
            });
        case actionTypes.LOGIN_FAIL:
            return updateObject(state, {
                isLoading: false,
                successfullLogin: false,
                responseMessage: action.responseMessage,
                showFeedbackModal: true
            });
        case actionTypes.CLEAR_MODAL:
            return updateObject(state, {
                responseMessage: null,
                successfullLogin: false,
                successfullSignup: false,
                showFeedbackModal: false
            });
        case actionTypes.LOGOUT:
            return updateObject(state, {
                isLoading: false,
                responseMessage: null,
                token: null,
                isAuth: false,
                username: null,
                firstname: null,
                lastname: null,
                email: null,
                userId: null,
                userImage: null,
                successfullLogin: false
            });
        case actionTypes.PROFILE_EDIT_START:
            return updateObject(state, {
                isLoading: true,
                responseMessage: null,
                isError: false
            });
        case actionTypes.PROFILE_EDIT_SUCCESS:
            return updateObject(state, {
                isLoading: false,
                showFeedbackModal: action.showFeedbackModal,
                responseMessage: action.responseMessage,
                isError: false,
                firstname: action.firstname,
                lastname: action.lastname,
                email: action.email,
                username: action.username,
                userImage: action.userImage
            });
        case actionTypes.PROFILE_EDIT_FAIL:
            return updateObject(state, {
                isLoading: false,
                responseMessage: action.responseMessage,
                showFeedbackModal: true,
                isError: true
            });
        default:
            break;
    }

    return state;
}

export default reducer;