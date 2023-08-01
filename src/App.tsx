import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/index';

import Layout from './hoc/Layout/Layout';
import Home from './components/Home/Home';
import Authentication from './containers/Authentication/Authentication';
import Logout from './components/Auth/Logout/Logout';

interface AppPropsType {
    authCheckState: () => void
  }

const App = (props: AppPropsType) => {
    useEffect(() => {
        props.authCheckState();
    }, [props]);

    const routes = (
        <Routes>
            <Route path='/logout' element={<Logout />} />
            <Route path='/auth/*' element={<Authentication />} />
            <Route path='/' element={<Home />} />
        </Routes>
    )

	const content = (
		<Layout>{routes}</Layout>
	);

	return content;
}

// TODO type tanımlaması yapılmalı
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => {
    return {
        authCheckState: () => dispatch(actions.authCheckState())
    }
}

export default connect(null, mapDispatchToProps)(App);