export interface SignupUserDataType {
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
}

export interface LoginUserDataType {
    email: string
    password: string
}

interface CreatedUserType {
    id: string
    status: string
    avatarUrl: string
    city: string
    firstName: string
    lastName: string
    username: string
    email: string
    updatedAt: string
    createdAt: string
}

export interface CreatedUserResponseType {
    message: string
    createdUser: CreatedUserType
}

export interface SuccessfulLoginResponseType {
    responseMessage: string
    token: string
    username: string
    userId: string
    userImage: string
    userStatus: string
    showFeedbackModal: boolean
}