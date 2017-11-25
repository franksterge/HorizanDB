import { Map } from 'immutable';

export default {
	uiStateAuthModal: Map({
		modalIsOpen: false,
		modalContentType: 'LOGIN'
	}),
	currentAuthStatus: Map({
		currentUser: null,
		status: 'Not Authenticated'
	})
};