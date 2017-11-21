import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from './firebase';

// r:database
let database = firebase.database();
let usersRef = database.ref().child('users');

usersRef.on('value', snapshot => {
	console.log('Users: ', snapshot.val());
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
