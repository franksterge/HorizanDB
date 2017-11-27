import * as types from './types';
import { call, put, takeEvery } from 'redux-saga/effects';
import firebaseApp, { firebaseAuth, firebaseDatabase } from '../../firebase';
import * as actions from './actions';
import * as authModalActions from '../uistate_authmodal/actions';
import { getNormalizedUserProfile } from './utils';

export function* loginUser(action) {
	try {
		// - call firebaseApp api
		// - upon success, dispatch types.LOGIN_SUCCESS
		let auth = firebaseApp.auth();
		let { email, password } = action.meta;

		const response = yield call(auth.signInWithEmailAndPassword, email, password);

		yield call(authModalActions.requestModalClose);
		yield put(actions.loginSuccessful, response.user);
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

export function* getUserProfile(action) {
	try {
		const userProfileLocation = firebaseDatabase.ref('User/' + action.meta.userProfileId);
		const userProfile = yield call([userProfileLocation, userProfileLocation.once], 'value');
		yield put(actions.profileReadSuccess(userProfile.val()));
	} catch (e) {
		console.log('Profile read error: ', e);
	}
}

export default function* watchAuthentication() {
	yield takeEvery(types.REQUEST_LOGIN, loginUser);
	yield takeEvery(types.REQUEST_SIGNUP, signupUser);
	yield takeEvery(types.REQUEST_PROFILE, getUserProfile);
}