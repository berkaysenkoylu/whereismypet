import svg from '../../../../../assets/images/sprite.svg';
import classes from './Option.module.scss';


interface OptionPropsType {
    name: string
    icon: string
    selected: boolean
    clicked: () => void
}

const Option = (props: OptionPropsType) => {
    const { name, icon, selected, clicked } = props;

    const renderIcon = (): React.ReactElement => {
        return (
            <svg className={classes.Option__Icon} style={selected ? { fill: '#fff'} : {}}>
                <use xlinkHref={`${svg}#icon-${icon}`}></use>
            </svg>
        );
    }

    return (
        <li className={classes.Option} style={selected ? { backgroundColor: '#0393cd'} : {}} onClick={clicked}>
            {renderIcon()}

            <span className={classes.Option__Name} style={selected ? { color: '#fff'} : {}}>{name}</span>
        </li>
    )
}

export default Option;