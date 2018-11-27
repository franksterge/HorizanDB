import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
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
	const persistConfig = {
		key: 'root',
		storage: storage,
		stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
		whitelist:['auth']
	   };
	  

	const pReducer = persistReducer(persistConfig, rootReducer);


	const sagaMiddleware = createSagaMiddleware();
	const pReducer = persistReducer(persistConfig, rootReducer);

	const store = createStore(
		pReducer,
		initialState,
		applyMiddleware(
			thunk,
			sagaMiddleware
		)
	);

	sagaMiddleware.run(rootSaga);


	let persistor = persistStore(store)
  	return { store, persistor }
};