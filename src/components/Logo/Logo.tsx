import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Logo.module.scss';

const Logo = () => {
    return (
        <NavLink to="/">
            <div className={classes.Logo}>
                &nbsp;
            </div>
        </NavLink>
    );
}

export default Logo