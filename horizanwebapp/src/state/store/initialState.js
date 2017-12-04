import { Map } from 'immutable';

export default {
	uiStateAuthModal: Map({
		modalIsOpen: false,
		modalContentType: 'LOGIN'
	}),
	uiStateFeedback: Map(null),
	currentAuthStatus: Map({
		currentUser: null,
		status: 'Not Authenticated'
	})
};