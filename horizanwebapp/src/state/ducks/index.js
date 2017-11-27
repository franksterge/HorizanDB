import { all } from 'redux-saga/effects';
import { authSagas } from './authentication';

export { default as authentication } from './authentication';
export { default as uistate_authmodal } from './uistate_authmodal';

export function* rootSaga() {
	yield all([
		...authSagas.default()
	]);
};