import classes from './MultiImageShowcase.module.scss';

interface MultiImageShowcasePropsType {
    style?: React.CSSProperties
}

const MultiImageShowcase = (props: MultiImageShowcasePropsType) => {
    const { style } = props;

    return (
        <div className={classes.MultiImageShowcase} style={style ? style : {}}>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
        </div>
    )
}

export default MultiImageShowcase;