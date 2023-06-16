import React from 'react';

import classes from './Toolbar.module.scss';
import Logo from '../../Logo/Logo';
import NavigationList from '../NavigationList/NavigationList';

const Toolbar = (props: any) => {
    return (
        <nav className={classes.ToolbarWrapper}>
            <div className={classes.Toolbar}>
                <Logo />

                <div className={classes.Toolbar__Main}>
                    <NavigationList isAuth={props.isAuth} status={props.userStatus} />
                </div>
            </div>
        </nav>
    );
}

export default Toolbar;