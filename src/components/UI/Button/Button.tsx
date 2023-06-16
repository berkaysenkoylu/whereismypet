import React from 'react';

import classes from './Button.module.scss';
import type { ButtonPropsType } from './types';

const Button = (props: ButtonPropsType) => {
    let classList = [classes.Button];

    switch(props.btnType) {
        case 'BtnPrimary':
            classList = [classes.Button, classes.ButtonPrimary];
            break;
        case 'BtnDanger':
            classList = [classes.Button, classes.ButtonDanger];
            break;
        case 'BtnSecondary':
            classList = [classes.Button, classes.ButtonSecondary];
            break;
        default:
            break;
    }

    if (props.btnSize && props.btnSize === 'BtnSmall') {
        classList.push(classes.ButtonSmall);
    }

    return (
        <button
            className={classList.join(' ')}
            onClick={props.clicked}
            disabled={props.disabled}>{props.label}</button>
    )
}

export default Button;