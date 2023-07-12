import React, { Fragment } from 'react'

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

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