import * as types from './types';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as firebase from 'firebase';
import * as actions from './actions';
import { getNormalizedUserProfile } from './utils';

export function* loginUser(action) {
	try {
		// - call firebase api
		// - upon success, dispatch types.LOGIN_SUCCESS
		let auth = firebase.auth();
		let { email, password } = action.meta;

		const response = yield call(auth.signInWithEmailAndPassword, email, password);

		yield put(actions.loginSuccessful, response.user);
	} catch (e) {
		// - upon success, dispatch types.LOGIN_FAILER
		console.log('error in loginUser:catch', e);
	}
}

export function* signupUser(action) {
	try {
		let { email, password, name } = action.meta;
		const auth = firebase.auth();

		// call the firebase api that creates users
		const createAuthResponse = yield call(auth.createUserWithEmailAndPassword, email, password);
		// destructure for less redundancy
		let { user } = createAuthResponse;
		// create the location in the database where the user data will be stored
		const userLocationRef = firebase.database().ref('Users/' + user.uid);
		// create a normalized user profile based off of all data associated with the user
		let userProfileNorm = getNormalizedUserProfile(Object.assign({}, action.meta, user));
		// call the firebase api that stores this user profile at the previously created location
		const storeUserResponse = yield call(userLocationRef.set, userProfileNorm);

		yield put(actions.signupSuccessful, userProfileNorm);
	} catch (e) {
		// - upon success, dispatch types.LOGIN_FAILER
		console.log('error in loginUser:catch', e);
	}
}

export default function* watchAuthentication() {
	yield takeEvery(types.REQUEST_LOGIN, loginUser);
	yield takeEvery(types.REQUEST_SIGNUP, signupUser);
}