import store from './';
import { firebaseAuth, firebaseDatabase } from '../firebase';
import { authActions } from '../ducks/authentication';

export default function(onInitComplete) {
	store.subscribe(() => {
		// Hack until new solution found
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
