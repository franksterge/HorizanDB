import { Map } from 'immutable';
import * as types from './types';
import initialState from '../../store/initialState';

export default function(state = initialState.currentAuthStatus, action) {
	switch (action.type) {
		case types.REQUEST_LOGIN:
		case types.REQUEST_SIGNUP:
			return state.mergeDeep(Map({
				status: action.meta.status
			}))
		case types.LOGIN_SUCCESS:
		case types.LOGIN_FAILED:
		case types.SIGNUP_FAILED:
		case types.SIGNUP_SUCCESS:
			return state.mergeDeep(Map(action.meta))
		default:
			return state;
	}
}