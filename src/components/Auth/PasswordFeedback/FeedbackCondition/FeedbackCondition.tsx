import svg from '../../../../assets/images/sprite.svg';
import classes from './FeedbackCondition.module.scss';

interface FeedbackConditionPropsType {
    isTrue: boolean
    label: string
}

const FeedbackCondition = (props: FeedbackConditionPropsType) => {
    return (
        <div className={classes.FeedbackCondition}>
            <svg className={classes.FeedbackCondition__Icon} style={{fill: props.isTrue ? 'green' : 'red'}}>
                <use xlinkHref={`${svg}#icon-${props.isTrue ? 'checkmark' : 'cross'}`}></use>
            </svg>
            <span>{props.label}</span>
        </div>
    )
}

export default FeedbackCondition;