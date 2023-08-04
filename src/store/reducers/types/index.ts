export interface StateType {
    isLoading: boolean
    responseMessage: string | null
    token: string | null
    isAuth: boolean
    firstname: string | null
    lastname: string | null
    email: string | null
    username: string | null
    userId: string | null
    userImage: string | null
    showFeedbackModal: boolean
    successfullSignup: boolean
    successfullLogin: boolean
    isError: boolean
}

export interface ActionType {
    type: string
    userId?: string | undefined | null
    firstname: string | undefined | null
    lastname: string | undefined | null
    email: string | undefined | null
    username?: string | undefined | null
    userImage?: string | undefined | null
    token?: string | undefined | null
    userStatus?: string | undefined | null
    path?: string | undefined | null
    responseMessage?: string | undefined | null
    showFeedbackModal?: boolean | undefined
}