import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import * as reducers from '../ducks';
import { rootSaga } from '../ducks';

/**
 * This file sets up our store to use redux
 * thunk and redux-saga middlewares.
 *
 * @param {initialState} initialState
 */
export default function configureStore( initialState ) {
	const rootReducer = combineReducers({
		uiStateAuthModal: reducers.uistate_authmodal,
		currentAuthStatus: reducers.authentication,
		uiStateFeedback: reducers.uistate_feedback
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