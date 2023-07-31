import { useState, useRef, useEffect } from 'react';

import classes from './PasswordFeedback.module.scss';
import FeedbackCondition from './FeedbackCondition/FeedbackCondition';
import type { ValidationMapType } from "./types";

/*
    A valid password should include the following:
    - at least 8 characters, at most 16 characters long
    - at least 1 uppercase character
    - at least 1 numeric character
    - at least 1 non-alpha numeric character like: `! @ # $ % ^ &`
*/

// TODO type tanımlaması yapılmalı
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
const PasswordFeedback = (props: any) => {
    const [validationMap, setValidationMap] = useState<ValidationMapType>({
        upperCase: {
            label: 'at least 1 uppercase character',
            value: false
        }, hasNumber: {
            label: 'at least 1 numeric character',
            value: false
        }, specialChar: {
            label: 'at least 1 of the following: ! @ # $ % ^ & *',
            value: false
        },
        validLength: {
            label: 'at least 8 characters, at most 16 characters long',
            value: false
        }
    });
    const [visible, setVisible] = useState(false);
    const [classList, setClassList] = useState([classes.PasswordFeedback]);
    // TODO type tanımlaması yapılmalı
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ref = useRef<any>();
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
    
    useEffect(() => {
        if (props.visible) {
            setVisible(true);
            setClassList([classes.PasswordFeedback, classes.PasswordFeedback__Visible]);
        } else {
            setClassList([classes.PasswordFeedback, classes.PasswordFeedback__Hide]);

            timeoutRef.current = setTimeout(() => {
                setVisible(false);
            }, 220);
        }
    }, [props.visible]);

    useEffect(() => {
        const copiedValidationMap = {...validationMap};
        let copiedValidationCondition;

        Object.keys(props.validation || {}).forEach((condition: string) => {
            copiedValidationCondition = { ...copiedValidationMap[condition as keyof typeof validationMap] };

            copiedValidationCondition.value = (props.validation || {})[condition] || false;
            copiedValidationMap[condition as keyof typeof validationMap] = copiedValidationCondition;
        });

        setValidationMap(copiedValidationMap);
        // eslint-disable-next-line
    }, [props.validation]);

    let content = null;

    if (visible) {
        content = (
            <div className={classList.join(' ')} ref={ref} id='PasswordFeedback'>
                {Object.keys(validationMap).map(condition => {
                    return <FeedbackCondition
                        key={condition}
                        isTrue={validationMap[condition as keyof typeof validationMap].value || false}
                        label={validationMap[condition as keyof typeof validationMap].label || ''}
                    />;
                })}
            </div>
        );
    }

    return content;
}

export default PasswordFeedback;