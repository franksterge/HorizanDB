import { all } from 'redux-saga/effects';
import { authSagas } from './authentication';
import { uistate_authmodalSagas } from './uistate_authmodal';

export { default as authentication } from './authentication';
export { default as uistate_authmodal } from './uistate_authmodal';
export { default as uistate_feedback } from './uistate_feedback';

export function* rootSaga() {
	yield all([
		...authSagas.default(),
		...uistate_authmodalSagas.default()
	]);
};