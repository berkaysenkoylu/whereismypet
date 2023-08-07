import classes from './AvatarShowcase.module.scss';

import { BACKEND_ORIGIN } from '../../../../../utils/utilits';

interface AvatarShowcasePropsType {
    userImage: string | null
}

const AvatarShowcase = (props: AvatarShowcasePropsType) => {
    let style = {};
    if (props.userImage) {
        style = {
            backgroundImage: `url(${BACKEND_ORIGIN + '/' + props.userImage.replace(/\\/g, '/')})`
        }
    }

    return (
        <figure className={classes.AvatarShowcase}>
            <div className={classes.AvatarShowcase__Img} style={style}></div>
        </figure>
    );
}

export default AvatarShowcase;