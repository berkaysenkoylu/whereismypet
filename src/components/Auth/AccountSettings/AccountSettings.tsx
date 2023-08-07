import { useRef, useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

import classes from './AccountSettings.module.scss';
import ProfileEdit from './ProfileEdit/ProfileEdit';
import SettingsMenu from './SettingsMenu/SettingsMenu';
import AvatarEdit from './AvatarEdit/AvatarEdit';
import PasswordEdit from './PasswordEdit/PasswordEdit';
import AccountTermination from './AccountTermination/AccountTermination';
import type { ProfileEditFormType } from './types';
import type { StateType } from '../../../store/reducers/types';
import AuthFeedback from '../AuthFeedback/AuthFeedback';

interface AccountSettingsPropsType {
    userId: string | null
    responseMessage: string | null
    isError: boolean
    showFeedbackModal: boolean
    profileEdit: (userId: string | null, data: ProfileEditFormType | FormData) => void
    clearModal: () => void
}

const AccountSettings = (props: AccountSettingsPropsType) => {
    const { userId, profileEdit } = props;
    const [selectedOption, setSelectedOption] = useState(1);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

    const onOptionItemClickedHandler = (id: number) => {
        setSelectedOption(id);
    }

    const onProfileEditFormSubmittedHandler = (data: ProfileEditFormType) => {
        profileEdit(userId, data);
    }

    const onUpdatedUserImageHandler = (file: File) => {
        const formData = new FormData();

        if (typeof file !== 'undefined') {
            formData.append('userImage', file);
        }

        profileEdit(userId, formData);
    }

    const onFeedbackModalClosedHandler = () => {
        timeoutRef.current = setTimeout(() => {
            props.clearModal();
        }, 220);
    }

    let content = <ProfileEdit profileEditFormSubmitted={onProfileEditFormSubmittedHandler} />;

    switch(selectedOption) {
        case 1:
            content = <ProfileEdit profileEditFormSubmitted={onProfileEditFormSubmittedHandler} />;
            break;
        case 2:
            content = <AvatarEdit updatedUserImage={onUpdatedUserImageHandler} />;
            break;
        case 3:
            content = <PasswordEdit />;
            break;
        case 4:
            content = <AccountTermination />;
            break;
    }

    return (
        <>
            <AuthFeedback
                showModal={props.showFeedbackModal}
                isSuccess={!props.isError}
                closeFeedback={onFeedbackModalClosedHandler}
                message={props.responseMessage}
            />
            <div className={classes.AccountSettings}>
                <SettingsMenu
                    selectedOption={selectedOption}
                    onOptionItemClicked={onOptionItemClickedHandler}
                />

                <div className={classes.AccountSettings__Content}>{content}</div>
            </div>
        </>
    );
}

const mapStateToProps = (state: StateType) => {
    return {
        isLoading: state.isLoading,
        userId: state.userId,
        responseMessage: state.responseMessage,
        isError: state.isError,
        showFeedbackModal: state.showFeedbackModal
    };
};

// TODO type tanımlaması yapılmalı
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => {
    return {
        profileEdit: (userId: string | null, data: ProfileEditFormType | FormData) => dispatch(actions.profileEdit(userId, data)),
        clearModal: () => dispatch(actions.clearModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);