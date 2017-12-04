import store from './';
import { firebaseAuth, firebaseDatabase } from '../firebase';
import { authActions } from '../ducks/authentication';

/**
 * What this function is for is wiring up firebase
 * to the redux store. Redux's store.subscribe method
 * listens to the store for particular changes (which
 * you can define) and inside the callback to store.subscribe
 * anything can be placed. For instance, some part of the
 * ui might dispatch a change to the search filter, so in response
 * we need to be able to call the firebase api or dispatch
 * another action. Take for instance the search feature e.g.
 * searchActions.fulfillSearchRequest(store.getState.newFilter).
 *
 * Another use case is wiring up firebase events with the store.
 * A classic example is firebaseAuth.onAuthStateChanged, that is
 * fired either when someone logs in, logs out or refreshes the browser.
 * We can dispatch the necessary actions inside the callback so that
 * it may keep the store in sync with what's actually happening.
 *
 * The onInitComplete callback is used to mount the dom *after*
 * all the wiring is finished. This is what ensures all the data
 * from firebase is either loading or loaded.
 *
 * @param {Function} onInitComplete
 */
export default function(onInitComplete) {
	store.subscribe(() => {
		/**
		 * HACK WARNING
		 *
		 * This was needed because the atlassian modal wouldn't show other wise.
		 */
		if (store.getState().uiStateAuthModal.get('modalIsOpen')) document.body.classList.add('atlasCounterHeight');
	});

	// auth listener, needed for keeping user
	// profile populated after app refresh
	firebaseAuth.onAuthStateChanged(user => {
		if (!!user) {
			let { currentAuthStatus } = store.getState();

			// setCurrentUser if its partially filled out
			if (!currentAuthStatus.get('currentUser')) {
				store.dispatch(authActions.requestProfileRead(user.uid));
				onInitComplete(null);
			}
		}
	});

	onInitComplete(null);
}
