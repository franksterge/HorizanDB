import * as firebase from 'firebase';
import * as authStateChangeOperation from '../ducks/authentication/operations';

export default function authListener() {
	firebase.auth().onAuthStateChanged(user => {
		if (!!user) {
			// setCurrentUser
			console.log('Must conduct operation to set current user');
		} else {
			// clearCurrentUser
			console.log('Must conduct operation to clear current user');
		}
	});
};