import * as types from './types';

export const requestLogin = (email, password) => ({
	type: types.REQUEST_LOGIN,
	meta: {
		email,
		password,
		status: 'Authenticating...'
	}
});

export const loginSuccessful = user => ({
	type: types.LOGIN_SUCCESS,
	meta: {
		currentUser: user,
		status: 'Authenticated!'
	}
});

export const loginFailed = () => ({
	type: types.LOGIN_FAILED,
	meta: {
		currentUser: null,
		status: 'Not Authenticated'
	}
});

export const requestLogOut = (email, password) => ({
	type: types.REQUEST_LOGOUT,
	meta: {
		currentUser: null,
		status: 'Not Authenticated'
	}
});

export const requestSignup = (email, password, firstname, lastname) => ({
	type: types.REQUEST_SIGNUP,
	meta: {
		email,
		password,
		firstname,
		lastname,
		status: 'Creating user...'
	}
});

export const signupSuccessful = user => ({
	type: types.SIGNUP_SUCCESS,
	meta: {
		currentUser: user,
		status: 'Authenticated!'
	}
});

export const signupFailed = () => ({
	type: types.SIGNUP_FAILED,
	meta: {
		status: 'Not Authenticated'
	}
});

export const requestProfileRead = userProfileId => ({
	type: types.REQUEST_PROFILE,
	meta: {
		userProfileId,
		status: 'Authenticating...'
	}
});

export const profileReadSuccess = userProfile => ({
	type: types.PROFILE_READ_SUCCESS,
	meta: {
		currentUser: userProfile,
		status: 'Authenticated!'
	}
});

export const profileReadFailed = () => ({
	type: types.PROFILE_READ_FAILED,
	meta: {
		currentUser: null,
		status: 'Not Authenticated'
	}
});