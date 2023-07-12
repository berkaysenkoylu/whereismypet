import React, { useState, useEffect } from 'react';

import classes from './Signup.module.scss';

const Signup = () => {
    const [classList, setClassList] = useState([classes.Signup]);

    useEffect(() => {
        setClassList([classes.Signup, classes.Signup__Show]);
    }, []);

    return (
        <div className={classList.join(" ")}>Signup</div>
    );
}

export default Signup;