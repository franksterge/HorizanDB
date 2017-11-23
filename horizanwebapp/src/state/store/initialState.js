import { Map } from 'immutable';

const initialState = {
	uiStateAuthModal: Map({
		modalIsOpen: false,
		modalContentType: 'LOGIN'
	}),
	currentAuthStatus: Map({
		authenticated: false,
		currentUser: Map(null),
		token: null
	})
};