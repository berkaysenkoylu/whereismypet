import classes from './CheckboxGroup.module.scss';
import Checkbox from './Checkbox/Checkbox';
import type { CheckboxItemsType, CheckboxGroupPropsType } from './types';

const CheckboxGroup = (props: CheckboxGroupPropsType) => {
    const { items, label, onItemChecked } = props;

    const checkboxes = items.map(((item: CheckboxItemsType) => {
        return <Checkbox
            key={item.name}
            name={item.name}
            checked={item.checked}
            changed={() => onItemChecked(item.name)}
        />
    }));

    return (
        <div className={classes.CheckboxGroup}>
            <h3>{label}</h3>

            <div className={classes.CheckboxGroup__Checkboxes}>
                {checkboxes}
            </div>
        </div>
    )
}

export default CheckboxGroup