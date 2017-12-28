import { Map } from 'immutable';
import * as types from './types';
import initialState from '../../store/initialState';

export default function(state = initialState.uiStateFeedback, action) {
  switch (action.type) {
		case types.EMIT_FEEDBACK:
			return Map(action.meta);
		case types.DISMISS_FEEDBACK:
			return Map(null);
		default:
			return state;
	}
}