// const firebase = require('firebase');
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/firestore';

export function firebaseLayer() {
  //   console.log(`Firebase ${firebase}`);

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: 'AIzaSyCVKs4L1oKI2F8Qs4IYi6duvnsaOhk_LxI',
    authDomain: 'cdv-2020-urbanski-javascript.firebaseapp.com',
    databaseURL: 'https://cdv-2020-urbanski-javascript.firebaseio.com',
    projectId: 'cdv-2020-urbanski-javascript',
    storageBucket: 'cdv-2020-urbanski-javascript.appspot.com',
    messagingSenderId: '353845327663',
    appId: '1:353845327663:web:c6c729d281e439484dd3da',
    measurementId: 'G-0ED0CP1XY2',
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  // Required for side-effects
  // const firestore = require('firebase/firestore');

  //   const db = firebase.firestore();

  // tutaj operacje na bazie danych
}
