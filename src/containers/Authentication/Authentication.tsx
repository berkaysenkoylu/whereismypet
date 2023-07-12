import React, { useState, useEffect, useRef } from 'react';

import classes from './Authentication.module.scss';
import Signup from '../../components/Auth/Signup/Signup';
import Login from '../../components/Auth/Login/Login';

const Authentication = () => {
    const [loginMode, setLoginMode] = useState(true);
    const [optionFormClassList, setOptionFormClassList] = useState([classes.Authentication__OptionForm]);
    let toggled = useRef<boolean>(false);

    useEffect(() => {
        // Should only execute when one of the toggle buttons is pressed
        toggled.current && setOptionFormClassList([classes.Authentication__OptionForm, loginMode ? classes.Authentication__OptionForm__BounceRight : classes.Authentication__OptionForm__BounceLeft]);
    }, [loginMode]);

    const onModeChangedHandler = (isLogin: boolean) => {
        toggled.current = true;
        setLoginMode(isLogin);
    }

    return (
        <section className={classes.Authentication}>
            <div className={classes.Authentication__Options}>
                <div className={classes.Authentication__OptionText}>
                    <div className={classes.Authentication__OptionText__Unregistered}>
                        <p>UNREGISTERED</p>
                        <button onClick={() => onModeChangedHandler(false)}>Sign Up</button>
                    </div>
                    <div className={classes.Authentication__OptionText__Registered}>
                        <p>REGISTERED</p>
                        <button onClick={() => onModeChangedHandler(true)}>Login</button>
                    </div>
                </div>

                <div className={optionFormClassList.join(" ")}>
                    {loginMode ? <Login /> : <Signup />}
                </div>
            </div>
        </section>
    );
}

export default Authentication;