export interface StateType {
    isLoading: boolean
    responseMessage: string | null
    token: string | null
    isAuth: boolean
    username: string | null
    userId: string | null
    userImage: string | null
    userStatus: string | null
    showFeedbackModal: boolean
    successfullSignup: boolean
    successfulLogin: boolean
}

export interface ActionType {
    type: string
    userId?: string | undefined | null
    username?: string | undefined | null
    userImage?: string | undefined | null
    token?: string | undefined | null
    userStatus?: string | undefined | null
    path?: string | undefined | null
    responseMessage?: string | undefined | null
    showFeedbackModal?: boolean | undefined
}