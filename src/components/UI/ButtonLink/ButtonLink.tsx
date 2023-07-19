import classes from './ButtonLink.module.scss';

type LinkType = 'LinkPrimary' | 'LinkDanger' | 'LinkWhite' | 'LinkCustom';
type LinkSize = 'Big' | 'Medium' | 'Small';

interface ButtonLinkPropsType {
    label: string
    type: LinkType
    size?: LinkSize
    noUnderline?: boolean
    clicked: () => void
}

const ButtonLink = (props: ButtonLinkPropsType) => {
    const { label, noUnderline, size, type, clicked } = props;
    let classList = [classes.ButtonLink];

    switch(type) {
        case 'LinkWhite':
            classList = [...classList, classes.ButtonLinkWhite];
            break;
        case 'LinkCustom':
            classList = [...classList, classes.ButtonLinkCustom];
            break;
        default:
            break;
    }

    switch(size) {
        case 'Big':
            classList = [...classList, classes.ButtonLinkBig];
            break;
        default:
            break;
    }

    if (noUnderline) {
        classList = [...classList, classes.NoUnderLine];
    }

    return (
        <div className={classList.join(" ")} onClick={clicked}>{label}</div>
    );
}

export default ButtonLink;