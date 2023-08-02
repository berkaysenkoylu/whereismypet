import { Fragment } from 'react';
import { connect } from 'react-redux';
import { Outlet } from 'react-router-dom';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import { StateType } from '../../store/reducers/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Layout = (props: any) => {
    const { username, userImage, isAuthenticated } = props;
	const testStyle = {
        maxWidth: '65%',
        margin: '2rem auto 0 auto'
    };

	return (
		<Fragment>
			<Toolbar isAuth={isAuthenticated} userData={{ username, userImage }} />

			<div style={testStyle}>
				<Outlet />
			</div>
		</Fragment>
	);
}

const mapStateToProps = (state: StateType) => {
    return {
        username: state.username,
        userImage: state.userImage,
        isAuthenticated: state.isAuth
    }
}

export default connect(mapStateToProps)(Layout);