import ReactDOM from 'react-dom';

import classes from './Backdrop.module.scss';

interface BackdropPropsType {
    show: boolean,
    // TODO type tanımlaması yapılmalı
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    clicked: any
}

const Backdrop = (props: BackdropPropsType) => {
    const portalDiv = document.getElementById('backdrop-root') as HTMLElement;

    return ReactDOM.createPortal(
        props.show ? <div className={classes.Backdrop} onClick={props.clicked}/> : null,
        portalDiv
    );
}
    

export default Backdrop;