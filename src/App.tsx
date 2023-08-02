import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/index';

import { checkAuthLoader, checkNotAuthLoader } from './utils/auth';

import Layout from './hoc/Layout/Layout';
import Home from './components/Home/Home';
import Authentication from './containers/Authentication/Authentication';
import Logout from './components/Auth/Logout/Logout';
import AccountSettings from './components/Auth/AccountSettings/AccountSettings';
import type { StateType } from './store/reducers/types';

interface AppPropsType {
    isAuth: boolean
    isLoading: boolean
    authCheckState: () => void
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        id: 'root',
        children: [
            { index: true, element: <Home /> },
            { path: '/auth', element: <Authentication />, loader: checkNotAuthLoader },
            { path: '/logout', element: <Logout />, loader: checkAuthLoader },
            { path: '/account', element: <AccountSettings />, loader: checkAuthLoader }
        ]
    }
]);

const App = (props: AppPropsType) => {
    useEffect(() => {
        props.authCheckState();
    }, []);

	return (
        <RouterProvider router={router} />
    );
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