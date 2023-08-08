import classes from './CtaBanner.module.scss';
import ButtonLink from '../UI/ButtonLink/ButtonLink';

interface CtaBannerPropsType {
    title: string
    buttonName: string
    buttonClick: () => void
}

const CtaBanner = (props: CtaBannerPropsType) => {
    const { title, buttonName, buttonClick } = props;

    return (
        <div className={classes.CtaBanner}>
            <div className={classes.CtaBanner__Overlay}></div>

            <div className={classes.CtaBanner__Cta}>
                <h3>
                    {title}
                </h3>

                <ButtonLink
                    noUnderline
                    type='LinkWhite'
                    size='Big'
                    label={buttonName}
                    clicked={buttonClick}
                />
            </div>
        </div>
    )
}

export default CtaBanner
