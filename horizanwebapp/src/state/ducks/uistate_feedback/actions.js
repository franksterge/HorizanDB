import * as types from './types';
import { getNormalizedFeedBack } from './utils';

export const emitFeedback = raw => ({
	type: types.EMIT_FEEDBACK,
	meta: getNormalizedFeedBack(raw)
})

export const dismissFeedback = () => ({ type: types.DISMISS_FEEDBACK });