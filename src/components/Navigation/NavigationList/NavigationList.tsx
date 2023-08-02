import classes from './NavigationList.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';
import NavigationDropdown from './NavigationDropdown/NavigationDropdown';

// TODO type tanımlaması yapılmalı
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NavigationList = (props: any) => {
    const { navigationList } = props;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        <ul className={classes.NavigationList}>
            {content}
        </ul>
	);
}

export default NavigationList;