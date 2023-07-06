import React, { useState, useEffect, useRef } from 'react';

import svg from '../../../../assets/images/sprite.svg';
import classes from './NavigationDropdown.module.scss';
import NavigationItem from '../NavigationItem/NavigationItem';

const NavigationDropdown = (props: any) => {
    const [showMenu, setShowMenu] = useState(false);
    const { data } = props;
    const { name, icon, showName, type, dropDownItems } = data;

    let menuRef = useRef<HTMLUListElement>(null);
    let toggleRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: any) => {
        if((toggleRef.current && toggleRef.current.contains(event.target))) {
            return;
        }

        if(!(menuRef.current && menuRef.current.contains(event.target))) {
            if(showMenu) {
                setShowMenu(showMenu => !showMenu);
            }
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        // eslint-disable-next-line
    }, [showMenu]);

    const onNavigationDropdownToggleHandler = () => {
        setShowMenu(showMenu => !showMenu);
    }

    const renderIcon = (): React.ReactElement => {
        return (
            <span className={classes.NavigationDropdown__IconContainer} style={/circular/.test(type) ? { borderRadius: '50%' } : {}}>
                <svg className={classes.NavigationDropdown__Icon}>
                    <use xlinkHref={`${svg}#icon-${icon}`}></use>
                </svg>
            </span>
        );
    }

    const renderMenuItems = (): React.ReactElement => {
        return dropDownItems.map((item: any, index: number) => {
            // return <li key={index} className={classes.NavigationDropdown__Menu__Item}>link {index + 1}</li>
            return <NavigationItem key={index} data={{...item, isDropDownElement: true}} />
        });
    }

    return (
        <div className={classes.NavigationDropdown}>
            <div className={classes.NavigationDropdown__Toggle} ref={toggleRef} onClick={onNavigationDropdownToggleHandler}>
                {renderIcon()}
                {showName ? <span className={classes.NavigationDropdown__Label}>{name}</span> : null}
            </div>

            {showMenu ? <ul className={classes.NavigationDropdown__Menu} ref={menuRef}>
                {renderMenuItems()}
            </ul> : null}
        </div>
    );
}

export default NavigationDropdown;