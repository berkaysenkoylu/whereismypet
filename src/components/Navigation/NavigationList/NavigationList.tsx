import React from 'react';

import classes from './NavigationList.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';
import NavigationDropdown from './NavigationDropdown/NavigationDropdown';

const NavigationList = (props: any) => {
    const { navigationList } = props;
    const content = navigationList.map((item: any, index: number) => {
        return (
            !(/dropdown/.test(item.type)) ?
                <NavigationItem
                    key={index}
                    data={item}
                /> : <NavigationDropdown
                    key={index}
                    data={item}
                />
        )
    });

	return (
		<ul className={classes.NavigationList}>{content}</ul>
	);
}

export default NavigationList;