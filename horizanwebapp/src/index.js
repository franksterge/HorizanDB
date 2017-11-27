import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

import Home from './views/pages/Home';
import store from './state/store';
import initializeStore from './state/store/initializeStore';

const RootHtml = ( ) => (
	<ReduxProvider store={ store }>
		<Router>
			<Home />
		</Router>
	</ReduxProvider>
);

initializeStore(() => {
	render( <RootHtml />, document.getElementById( 'react-root' ) );
});


