import authListeners from './authListeners';

/*
	What it does: binds the redux store with
	firebase and then calls the onInitComplete
	which can be the react render function.

	Purpose: this will setup communication
	between the redux store and the firebase
*/
export default function initializeListeners(onInitComplete) {
	authListeners();
};