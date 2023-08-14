import classes from './Checkbox.module.scss';

interface CheckboxPropsType {
    name: string
    checked: boolean
    changed: () => void
}

const Checkbox = (props: CheckboxPropsType) => {
    const { name, checked } = props;
    return (
        <div className={classes.Checkbox} onClick={props.changed}>
            <input
                type='checkbox'
                name={name}
                checked={checked}
                onChange={props.changed}
            />
            <label htmlFor={name}>{name}</label>
        </div>
    );
}

export default Checkbox;