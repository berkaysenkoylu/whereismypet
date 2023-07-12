import React from 'react';
import { Route, Routes } from "react-router-dom";

import Layout from './hoc/Layout/Layout';
import Home from './components/Home/Home';
import Authentication from './containers/Authentication/Authentication';

const App = () => {

    const routes = (
        <Routes>
          <Route path='/auth/*' element={<Authentication />} />
          <Route path='/' element={<Home />} />
        </Routes>
      )

	const content = (
		<Layout>{routes}</Layout>
	);

	return content;
}

export default App;