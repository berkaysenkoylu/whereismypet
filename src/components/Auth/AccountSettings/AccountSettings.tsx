import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import classes from './AccountSettings.module.scss';
import ProfileEdit from './ProfileEdit/ProfileEdit';
import SettingsMenu from './SettingsMenu/SettingsMenu';
import AvatarEdit from './AvatarEdit/AvatarEdit';
import PasswordEdit from './PasswordEdit/PasswordEdit';
import AccountTermination from './AccountTermination/AccountTermination';
import { StateType } from '../../../store/reducers/types';

const AccountSettings = () => {
    const [selectedOption, setSelectedOption] = useState(1);
    const isAuth = useSelector<StateType>(state => state.isAuth);

    // Authorization
    if (!isAuth) {
        return <Navigate to='/auth' replace />
    }

    const onOptionItemClickedHandler = (id: number) => {
        setSelectedOption(id);
    }

    let content = <ProfileEdit />;

    switch(selectedOption) {
        case 1:
            content = <ProfileEdit />;
            break;
        case 2:
            content = <AvatarEdit />;
            break;
        case 3:
            content = <PasswordEdit />;
            break;
        case 4:
            content = <AccountTermination />;
            break;
    }

    return (
        <div className={classes.AccountSettings}>
            <SettingsMenu
                selectedOption={selectedOption}
                onOptionItemClicked={onOptionItemClickedHandler}
            />

            <div className={classes.AccountSettings__Content}>{content}</div>
        </div>
    );
}

export default AccountSettings;