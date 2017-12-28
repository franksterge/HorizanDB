import { Map } from 'immutable';
import * as types from './types';
import initialState from '../../store/initialState';

export default function(state = initialState.currentAuthStatus, action) {
	switch (action.type) {
		// requests
		case types.REQUEST_LOGIN:
		case types.REQUEST_SIGNUP:
		case types.REQUEST_PROFILE:
			return state.mergeDeep(Map({
				status: action.meta.status
			}))
		// met/un-met requests
		case types.REQUEST_LOGOUT:
		case types.LOGIN_SUCCESS:
		case types.LOGIN_FAILED:
		case types.SIGNUP_FAILED:
		case types.SIGNUP_SUCCESS:
		case types.PROFILE_READ_SUCCESS:
		case types.PROFILE_READ_FAILED:
			return state.mergeDeep(Map(action.meta))
		default:
			return state;
	}
}