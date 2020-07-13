import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const config = {
  apiKey: "xxxxxxx",
  authDomain: "xxxxxxx",
  databaseURL: "xxxxx",
  projectId: "xxxxxx",
  storageBucket: "xxxxxx",
  messagingSenderId: "xxxxxx",
  appId: "xxxxxx"
};

firebase.initializeApp( config);
firebase.firestore();


export default firebase;
