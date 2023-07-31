import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.scss';
import Backdrop from '../UI/Backdrop/Backdrop';

interface ModalPropsType {
    content?: string,
    show: boolean,
    // TODO type tanımlaması yapılmalı
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customStyle?: any,
    closed: () => void,
    children?: React.ReactNode
}

const Modal = (props: ModalPropsType) => {
    const [modalClasses, setModalClasses] = useState([classes.ModalContainer]); // KEEP IT OR LEAVE IT
    const portalDiv = document.getElementById('modal-root') as HTMLElement;

    useEffect(() => {
        setModalClasses([classes.ModalContainer]); // KEEP IT OR LEAVE IT
    }, [props.show]);

    const closeModalHandler = () => {
        props.closed();

        setModalClasses([classes.ModalContainer, classes.ModalContainer__Closed]); // KEEP IT OR LEAVE IT
    }

    return (
        ReactDOM.createPortal(
            props.show ? (
                <div className={modalClasses.join(' ')} style={props.customStyle}>
                    <Backdrop show={props.show} clicked={closeModalHandler} />
                    <div className={classes.Modal}>
                        <span className={classes.ModalContainer__CloseButton} onClick={closeModalHandler}>&nbsp;</span>
                        {props.content ?
                        <div dangerouslySetInnerHTML={{__html: props.content}}></div> :
                        props.children}
                    </div>
                </div>) : null,
            portalDiv
        )
    );
}  

export default Modal;