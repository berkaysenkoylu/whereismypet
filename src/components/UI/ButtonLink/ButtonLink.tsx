import React from 'react';

import classes from './ButtonLink.module.scss';

type LinkType = 'LinkPrimary' | 'LinkDanger' | 'LinkSecondary' | 'LinkCustom'

interface ButtonLinkPropsType {
    label: string
    type: LinkType
    clicked: () => void
}

const ButtonLink = (props: ButtonLinkPropsType) => {
    const { label, type, clicked } = props;
    let classList = [classes.ButtonLink];

    switch(type) {
        case 'LinkCustom':
            classList = [classes.ButtonLink, classes.ButtonLinkCustom];
            break;
        default:
            break;
    }

    return (
        <div className={classList.join(" ")} onClick={clicked}>{label}</div>
    );
}

export default ButtonLink;