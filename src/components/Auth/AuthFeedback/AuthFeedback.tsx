import { Player } from '@lottiefiles/react-lottie-player';

import classes from './AuthFeedback.module.scss';
import Modal from '../../Modal/Modal';

import successAnimData from '../../../assets/anim/success_check.json';
import failureAnimData from '../../../assets/anim/failure_cross.json';

interface AuthFeedbackPropsType {
  showModal: boolean,
  isSuccess: boolean,
  message?: string | null,
  closeFeedback: () => void
}

const AuthFeedback = (props: AuthFeedbackPropsType) => {
    const { showModal, isSuccess, message, closeFeedback } = props;

    const onFeedbackClosed = () => {
        closeFeedback();
    }

    return (
        <Modal show={showModal} closed={onFeedbackClosed}>
            <div className={classes.AuthFeedback}>
                <Player
                    src={isSuccess ? successAnimData : failureAnimData}
                    keepLastFrame
                    autoplay
                    speed={1}
                    className={classes.AuthFeedback__AnimContainer}
                />
                <div className={classes.AuthFeedback__Header}>
                <h2>{message}</h2>
                </div>
            </div>
        </Modal>
    )
}

export default AuthFeedback;