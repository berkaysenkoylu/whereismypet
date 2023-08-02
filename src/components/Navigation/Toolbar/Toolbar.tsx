import classes from './Toolbar.module.scss';
import Logo from '../../Logo/Logo';
import NavigationList from '../NavigationList/NavigationList';

// TODO type tanımlaması yapılacak
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Toolbar = (props: any) => {
    const { userData } = props;
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
            dropDownItems: [{
                name: "Dogs",
                icon: "warning",
                path: "/categories/dogs"
            }, {
                name: "Cats",
                icon: "warning",
                path: "/categories/cats"
            }, {
                name: "Others",
                icon: "warning",
                path: "/categories/others"
            }],
            backColor: "#ff5781",
            iconColor: "#8f1e3e"
        },
        !props.isAuth ? {
            name: "Login",
            icon: "enter",
            showName: true,
            type: "normal-button",
            path: "/auth",
            iconColor: "color-gray-dark",
            textColor: "color-gray-dark"
        } : {
            name: `Hi, ${userData.username}!`,
            icon: null,
            showName: true,
            isAccount: true,
            avatarPath: userData.userImage,
            type: "circular-dropdown",
            path: null,
            dropDownItems: [{
                name: "Settings",
                // TODO change this
                icon: "warning",
                path: "/account"
            }, {
                name: "Logout",
                icon: "exit",
                path: "/logout"
            }]
        }
    ].filter(Boolean);

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