import React from 'react';
import { NavLink } from 'react-router-dom';

import svg from '../../../../../assets/images/sprite.svg';
import classes from './DropdownMenuItem.module.scss';

const DropdownMenuItem = (props: any) => {
    const { data } = props;
    const { name, icon, path } = data;

    const renderIcon = () => {
        return (
            <svg className={classes.DropdownMenuItem__Icon}>
                <use xlinkHref={`${svg}#icon-${icon}`}></use>
            </svg>
        );
    }

    return (
        <NavLink to={path} className={classes.DropdownMenuItem}>
            <span className={classes.DropdownMenuItem__Content}>
                {renderIcon()}
                <span>{name}</span>
            </span>
        </NavLink>
    );
}

export default DropdownMenuItem;