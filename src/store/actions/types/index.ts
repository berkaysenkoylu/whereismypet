export interface SignupUserDataType {
    firstname: string
    lastname: string
    username: string
    email: string
    password: string
}

export interface LoginUserDataType {
    email: string
    password: string
}

export interface ProfileEditFormDataType {
    firstname?: string
    lastname?: string
    username?: string
    password?: string
    email?: string
    avatar?: File
}

export interface ProfileEditSuccessDataType {
    firstname: string
    lastname: string
    username: string
    email: string
    userImage: string
    showFeedbackModal: boolean
    responseMessage: string
}

interface CreatedUserType {
    id: string
    status: string
    avatarUrl: string
    city: string
    firstname: string
    lastname: string
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
    firstname: string,
    lastname: string,
    email: string,
    userId: string
    userImage: string
    showFeedbackModal: boolean
}