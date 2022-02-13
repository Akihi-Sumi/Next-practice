import firebase from 'firebase';

const firebaseConfig = {

apiKey: "AIzaSyBcuXr-7sgBPM2Cs4Pn7L1HqJh-Bn1Dgws",

authDomain: "akihisumi-nextjs.firebaseapp.com",

projectId: "akihisumi-nextjs",

storageBucket: "akihisumi-nextjs.appspot.com",

messagingSenderId: "374800071688",

appId: "1:374800071688:web:7966474555a897b873e5bd"

};

if (firebase.apps.length == 0) {
    firebase.initializeApp(firebaseConfig)
}