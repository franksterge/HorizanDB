import * as types from './types';

export const requestModalOpen = () => ({ type: types.REQUEST_MODAL_OPEN });

export const requestModalClose = () => ({ type: types.REQUEST_MODAL_CLOSE });

export const requestModalContentSet = content => ({
	type: types.REQUEST_MODAL_CONTENTSET,
	meta: {
		modalContentType: content
	}
});