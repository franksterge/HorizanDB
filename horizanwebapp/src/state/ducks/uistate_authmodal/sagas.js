/**
 * Some sagas wont interact with apis at all, take for instance
 * this module. All it simply does is listen for any kind of interaction
 * with the modal (REQUEST_MODAL_OPEN, REQUEST_MODAL_CONTENTSET, REQUEST_MODAL_CLOSE)
 * and resets the feedback that might be in the modal via clearCurrentBefore. For
 * instance, after getting the password wrong, the user closes the modal, if we open
 * the modal again we dont want the error to still be there so we reset things this 
 * way.
 */
import * as types from './types';
import { call, put, takeEvery, fork } from 'redux-saga/effects';
import * as actions from './actions';
import * as feedbackActions from '../uistate_feedback/actions';

export function* clearCurrentBefore(action) {
	try {
		yield put(feedbackActions.dismissFeedback())
	} catch (e) {
		throw new Error('Error trying to yield put(feedbackActions.dismissFeedback()) check implementation');
	}
}

export default function* watchModal() {
	yield takeEvery(types.REQUEST_MODAL_OPEN, clearCurrentBefore);
	yield takeEvery(types.REQUEST_MODAL_CONTENTSET, clearCurrentBefore);
	yield takeEvery(types.REQUEST_MODAL_CLOSE, clearCurrentBefore);
}
