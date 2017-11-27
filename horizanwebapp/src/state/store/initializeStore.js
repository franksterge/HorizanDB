import store from './';
import { firebaseAuth } from '../firebase';
import { authActions } from '../ducks/authentication';

export default function(onInitComplete) {
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
