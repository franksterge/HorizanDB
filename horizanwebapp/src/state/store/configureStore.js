import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import * as reducers from '../ducks';
import { rootSaga } from '../ducks';

export default function configureStore( initialState ) {
	const rootReducer = combineReducers({
		uiStateAuthModal: reducers.uistate_authmodal,
		currentAuthStatus: reducers.authentication
	});

	const sagaMiddleware = createSagaMiddleware();

	const store = createStore(
		rootReducer,
		initialState,
		applyMiddleware(
			thunk,
			sagaMiddleware
		)
	);

	sagaMiddleware.run(rootSaga);

	return store;
};