import { Map } from 'immutable';
import * as types from './types';
import initialState from '../../store/initialState';

export default function(state = initialState.uiStateAuthModal, action) {
  switch (action.type) {
    case types.REQUEST_MODAL_OPEN:
      return state.set('modalIsOpen', true);
    case types.REQUEST_MODAL_CLOSE:
			return state.set('modalIsOpen', false);
		case types.REQUEST_MODAL_CONTENTSET:
      return state.set('modalContentType', action.meta.modalContentType);
    default:
      return state;
  }
}
