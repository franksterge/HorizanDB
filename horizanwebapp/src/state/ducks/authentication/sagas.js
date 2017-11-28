/**
 * TODO: thoroughly document what each function in this
 * file does
 *
 * Purpose of this file: use generators and redux-saga
 * to remove api level code (interactions with firebase
 * and other sources of callback hell) from react/redux.
 *
 * Rough explanation of this works: there are two types
 * of sagas, watcher sagas and worker sagas. Watcher sagas
 * *watch* for actions that've been dispatched, and then
 * they call the corresponding worker sagas. Inside worker
 * sagas is where interaction with apis happen (mainly
 * interacting with firebase). This allows us to decouple
 * the process of interacting with (firebase) from the process
 * of keeping the redux store and react components in sync.
 */
import * as types from './types';
import { call, put, takeEvery, fork } from 'redux-saga/effects';
import firebaseApp, { firebaseAuth, firebaseDatabase } from '../../firebase';
import * as actions from './actions';
import * as authModalActions from '../uistate_authmodal/actions';
import { getNormalizedUserProfile } from './utils';

export function* loginUser(action) {
	try {
		// - call firebaseApp api
		// - upon success, dispatch types.LOGIN_SUCCESS
		let { email, password } = action.meta;

		const response = yield call([firebaseAuth, firebaseAuth.signInWithEmailAndPassword], email, password);

		yield put(actions.loginSuccessful(getNormalizedUserProfile(response)));
		yield put(authModalActions.requestModalClose());
	} catch (e) {
		// - upon success, dispatch types.LOGIN_FAILER
		console.log('error in loginUser:catch', e);
	}
}

export function* signupUser(action) {
	try {
		let { email, password, firstname, lastname } = action.meta;

		// call the firebaseApp api that creates users
		const createdUser = yield call(
			[ firebaseAuth, firebaseAuth.createUserWithEmailAndPassword],
			email,
			password
		);

		// create a normalized user profile based off of all data associated with the user
		const userProfileNorm = getNormalizedUserProfile(Object.assign({}, action.meta, createdUser));
		// create a ref to the location in the database where the profile will be stored
		const userLocationRef = firebaseDatabase.ref('User/' + userProfileNorm.uid);
		// store the profile at that location
		yield call([userLocationRef, userLocationRef.set], userProfileNorm);
		yield put(actions.signupSuccessful(userProfileNorm));

		yield put(authModalActions.requestModalClose());
	} catch (e) {
		// - upon success, dispatch types.LOGIN_FAILER
		console.log('error in loginUser:catch', e);
	}
}

export function* logOut() {
	try {
		// - call firebaseApp api
		// - upon success, dispatch types.LOGIN_SUCCESS
		yield call([firebaseAuth, firebaseAuth.signOut]);
		yield fork([actions, actions.requestLogOut]);
	} catch (e) {
		// - upon success, dispatch types.LOGIN_FAILER
		console.log('error in loginUser:catch', e);
	}
}

export function* getUserProfile(action) {
	try {
		const userProfileLocation = firebaseDatabase.ref('User/' + action.meta.userProfileId);
		const userProfile = yield call([userProfileLocation, userProfileLocation.once], 'value');
		yield put(actions.profileReadSuccess(userProfile.val()));
	} catch (e) {
		console.log('Profile read error: ', e);
	}
}

/**
 * Watcher saga that wires up the four worker
 * sagas above.
 */
export default function* watchAuthentication() {
	yield takeEvery(types.REQUEST_LOGIN, loginUser);
	yield takeEvery(types.REQUEST_LOGOUT, logOut);
	yield takeEvery(types.REQUEST_SIGNUP, signupUser);
	yield takeEvery(types.REQUEST_PROFILE, getUserProfile);
}