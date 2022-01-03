const firebaseConfig = {
	apiKey: 'AIzaSyBWmACnJ4YHcs6alRm2BgP0O4P2700A1-8',
	authDomain: 'library-bookstore-77ccd.firebaseapp.com',
	projectId: 'library-bookstore-77ccd',
	databaseURL: 'https://library-bookstore-77ccd-default-rtdb.firebaseio.com/',
	storageBucket: 'library-bookstore-77ccd.appspot.com',
	messagingSenderId: '772350239780',
	appId: '1:772350239780:web:babd4e704057bfa04464b1',
};

firebase.initializeApp(firebaseConfig);
let db = firebase.database();
