/*
	An object used for converting third
	party api feedback codes to something
	recognizable to users. This could very
	easily break the second firebase changes
	their api so a backup solution would be
	nice. (https://firebase.google.com/docs/reference/js/firebase.auth.Auth)
	*/
export const feedbackTypes = {
	'auth/wrong-password': {
		uiLocatin: 'AUTH_MODAL',
		code: 'Login error!',
		message: 'The password you entered was incorrect',
		type: 'error'
	},
	'auth/user-not-found': {
		uiLocatin: 'AUTH_MODAL',
		code: 'Unrecognized user!',
		message: 'No user associated with this email address!',
		type: 'error'
	},
	'auth/email-already-in-use': {
		uiLocatin: 'AUTH_MODAL',
		code: 'Un-authorized!',
		message: 'This email is already in use!',
		type: 'error'
	},
	'auth/passwords-dont-match': {
		uiLocatin: 'AUTH_MODAL',
		code: 'Error!',
		message: 'The two passwords must match!',
		type: 'error'
	},
	default: {
		uiLocatin: 'GLOBAL',
		code: 'Error',
		message: 'Something went wrong which we are looking into, please check again later!',
		type: 'warning'
	}
};

export const getNormalizedFeedBack = rawFeedBack => feedbackTypes[rawFeedBack.code] || feedbackTypes[rawFeedBack] || feedbackTypes.default;