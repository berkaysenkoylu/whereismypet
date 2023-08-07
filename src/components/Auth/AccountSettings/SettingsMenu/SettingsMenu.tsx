import Option from './Option/Option';

import { settingsOptions } from './SettingsData';
import classes from './SettingsMenu.module.scss';
import type { OptionType } from './types';

interface SettingsMenuPropsType {
    selectedOption: number
    onOptionItemClicked: (id: number) => void
}

const SettingsMenu = (props: SettingsMenuPropsType) => {
    const { selectedOption, onOptionItemClicked } = props;

    const content = settingsOptions.map((item: OptionType, index: number) => {
        return <Option
            key={item.id}
            {...item}
            selected={index + 1 === selectedOption}
            clicked={() => onOptionItemClicked(item.id)}
        />
    });

    return (
        <ul className={classes.SettingsMenu}>
            {content}
        </ul>
    );
}

export default SettingsMenu;