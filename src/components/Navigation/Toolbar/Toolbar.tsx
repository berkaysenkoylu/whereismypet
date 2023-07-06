import React from 'react';

import classes from './Toolbar.module.scss';
import Logo from '../../Logo/Logo';
import NavigationList from '../NavigationList/NavigationList';

const Toolbar = (props: any) => {
    // TODO: revisit this
    const navigationList = [
        {
            name: "Home",
            icon: "home",
            showName: false,
            type: "circular-button",
            path: "/",
            backColor: "rgba(155, 198, 255, 0.5)",
            iconColor: "#2998ff"
        },
        {
            name: "Categories",
            icon: "menu",
            showName: true,
            type: "circular-dropdown",
            path: null,
            // TODO: revisit this
            dropDownItems: [{
                name: "Dogs",
                icon: "warning",
                showName: true,
                type: "normal-button",
                path: "/categories/dogs"
            }, {
                name: "Cats",
                icon: "warning",
                showName: true,
                type: "normal-button",
                path: "/categories/cats"
            }, {
                name: "Others",
                icon: "warning",
                showName: true,
                type: "normal-button",
                path: "/categories/others"
            }],
            backColor: "#ff5781",
            iconColor: "#8f1e3e"
        },
        {
            name: "Login",
            // TODO change this
            icon: "warning",
            showName: true,
            type: "normal-button",
            path: "/login",
            iconColor: "#4b4b4b",
            textColor: "#4b4b4b"
        }
    ];

    return (
        <nav className={classes.ToolbarWrapper}>
            <div className={classes.Toolbar}>
                <Logo />

                <div className={classes.Toolbar__Main}>
                    <NavigationList
                        isAuth={props.isAuth}
                        status={props.userStatus}
                        navigationList={navigationList}
                    />
                </div>
            </div>
        </nav>
    );
}

export default Toolbar;