import * as firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyDs7hu4T9Hri-9PAgqAHbH3CZQfVNHMJLk',
	authDomain: 'horizan-f3127.firebaseapp.com',
	databaseURL: 'https://horizan-f3127.firebaseio.com',
	projectId: 'horizan-f3127',
	storageBucket: 'horizan-f3127.appspot.com',
	messagingSenderId: '64166773945'
});

const firebaseAuth = firebaseApp.auth();
const firebaseDatabase = firebaseApp.database();

export {
	firebaseAuth,
	firebaseDatabase
}

export default firebaseApp;