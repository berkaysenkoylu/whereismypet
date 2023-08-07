import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import svg from '../../../../assets/images/sprite.svg';
import classes from './NavigationDropdown.module.scss';
import DropdownMenuItem from './DropdownMenuItem/DropdownMenuItem';
import { BACKEND_ORIGIN } from '../../../../utils/utilits';
import type { StateType } from '../../../../store/reducers/types';

// TODO type tanımlamaları yapılacak
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NavigationDropdown = (props: any) => {
    const userImage: string | null = useSelector((state: StateType) => state.userImage);
    const [showMenu, setShowMenu] = useState(false);
    const { data } = props;
    const { name, icon, isAccount, showName, type, dropDownItems } = data;

    const menuRef = useRef<HTMLUListElement>(null);
    const toggleRef = useRef<HTMLDivElement>(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    const renderAccountImage = () => {
        let style = {};
        if (userImage) {
            style = {
                backgroundImage: `url(${BACKEND_ORIGIN + '/' + userImage.replace(/\\/g, '/')})`
            }
        }
        return (
            <div className={classes.NavigationDropdown__AccImgContainer}>
                <figure className={classes.NavigationDropdown__AccImgContainer__Image}>
                    <div className={classes.NavigationDropdown__AccImgContainer__Image__Item} style={style} />
                </figure>
            </div>
        );
    }

    const renderMenuItems = (): React.ReactElement => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return dropDownItems.map((item: any, index: number) => {
            // return <li key={index} className={classes.NavigationDropdown__Menu__Item}>link {index + 1}</li>
            return (
                <DropdownMenuItem key={index} data={item} dropdownItemClicked={() => setShowMenu(false)} />
            );
        });
    }

    return (
        <div className={classes.NavigationDropdown}>
            <div className={classes.NavigationDropdown__Toggle} ref={toggleRef} onClick={onNavigationDropdownToggleHandler}>
                {!isAccount ? renderIcon() : renderAccountImage()}
                {showName ? <span className={classes.NavigationDropdown__Label}>{name}</span> : null}
            </div>

            {showMenu ? <ul className={classes.NavigationDropdown__Menu} style={isAccount ? { top: '5rem' } : {}} ref={menuRef}>
                {renderMenuItems()}
            </ul> : null}
        </div>
    );
}

export default NavigationDropdown;