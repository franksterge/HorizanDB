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
