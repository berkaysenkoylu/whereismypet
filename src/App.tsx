import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/index';

import Layout from './hoc/Layout/Layout';
import Home from './components/Home/Home';
import Authentication from './containers/Authentication/Authentication';
import Logout from './components/Auth/Logout/Logout';
import { StateType } from './store/reducers/types';
import AccountSettings from './components/Auth/AccountSettings/AccountSettings';

interface AppPropsType {
    isAuth: boolean
    isLoading: boolean
    authCheckState: () => void
}

const App = (props: AppPropsType) => {
    useEffect(() => {
        props.authCheckState();
    }, [props]);

    const routes = (
        <Routes>
            {props.isAuth ? <Route path='/account' element={<AccountSettings />} /> : null}
            <Route path='/logout' element={<Logout />} />
            <Route path='/auth/*' element={<Authentication />} />
            <Route path='/' element={<Home />} />
        </Routes>
    )

	const content = (
		<Layout>{!props.isLoading ? routes : null}</Layout>
	);

	return content;
}

const mapStateToProps = (state: StateType) => {
    return {
        isLoading: state.isLoading,
        isAuth: state.isAuth
    };
};

// TODO type tanımlaması yapılmalı
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => {
    return {
        authCheckState: () => dispatch(actions.authCheckState())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);