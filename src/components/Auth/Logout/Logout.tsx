import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as actions from '../../../store/actions/index';
import AuthFeedback from "../AuthFeedback/AuthFeedback";

const Logout = () => {
    const [showModal, setShowModal] = useState(true);
    // const isAuth = useSelector<StateType>(state => state.isAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
    const navigateTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        dispatch(actions.logout());
    }, [dispatch]);

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current);
            clearTimeout(navigateTimeoutRef.current);
        }
    }, []);

    const onModalClosedHandler = () => {
        timeoutRef.current = setTimeout(() => {
            setShowModal(false);

            navigateTimeoutRef.current = setTimeout(() => {
                navigate('/');
            }, 200);
        }, 220);
    }

    return (
        <>
            <AuthFeedback
                showModal={showModal}
                isSuccess={true}
                closeFeedback={onModalClosedHandler}
                message='You are successfully logged out!'
            />
        </>
    )
}

export default Logout;