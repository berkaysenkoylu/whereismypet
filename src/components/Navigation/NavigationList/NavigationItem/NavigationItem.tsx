import React from 'react';
import { NavLink } from 'react-router-dom';

import svg from '../../../../assets/images/sprite.svg';
import classes from './NavigationItem.module.scss';

const NavigationItem = (props: any) => {
    const { data } = props;
    const { name, icon, showName, type, path, backColor, iconColor, isDropDownElement } = data;

    const renderIcon = (): React.ReactElement => {
        return (
            <span className={classes.NavigationItem__IconContainer} style={/circular/.test(type) ?
                { borderRadius: '50%', backgroundColor: `${backColor}` } : { backgroundColor: `rgba(${backColor})` }}>
                <svg className={classes.NavigationItem__Icon} style={{ fill: `${iconColor}` }}>
                    <use xlinkHref={`${svg}#icon-${icon}`}></use>
                </svg>
            </span>
        );
    }

    const renderLinkContent = (): React.ReactElement => {
        return (
            <span className={classes.NavigationItem__LinkContent}>
                {renderIcon()}
                {showName ? <span style={{ color: `${iconColor}` }}>{name}</span> : null}
            </span>
        )
    }

    return (
        <li className={classes.NavigationItem} style={isDropDownElement ? { justifyContent: 'left' } : {}}>
            <NavLink to={path} className={classes.NavigationItem__Link}>{renderLinkContent()}</NavLink>
        </li>
    );
}

export default NavigationItem;