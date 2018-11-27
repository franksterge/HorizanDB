/**
 * Todo: read up on new react-router as it is
 * drastically different from the old ones.
 */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import routes from './views/routes';

import './views/styles/reset.min.css';
import './views/styles/css/index.css';

import store from './state/store';
import initializeStore from './state/store/initializeStore';

initializeStore(error => {
	if (error) {
		// console.log('Error occurred while initializing app.');
		throw error;
	}

	render(
		<Provider store={store}>
			<BrowserRouter>
				{ routes }
			</BrowserRouter>
		</Provider>,
		document.getElementById('react-root')
	);
});