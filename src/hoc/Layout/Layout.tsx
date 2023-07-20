import { Fragment } from 'react'

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Layout = (props: any) => {
	const testStyle = {
        maxWidth: '65%',
        margin: '2rem auto 0 auto'
    };

	return (
		<Fragment>
			<Toolbar isAuth={props.isAuthenticated} userStatus={props.userStatus} />

			<div style={testStyle}>
				{props.children}
			</div>
		</Fragment>
	);
}

export default Layout