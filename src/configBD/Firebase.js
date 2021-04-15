import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDKK25NcczrpMpFMl_7BV3_KgXW4ndQLGQ",
    authDomain: "area50.firebaseapp.com",
    databaseURL: "https://area50.firebaseio.com",
    projectId: "firebase-area50",
    storageBucket: "firebase-area50.appspot.com",
    messagingSenderId: "807211020828"
};

const firebaseConf = firebase.initializeApp(config);
export default firebaseConf;