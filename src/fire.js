import firebase from 'firebase';

/*
// DEVAUS:
var config = {
    apiKey: "AIzaSyB5vqwusAIVlRNqDhNHTej34XqO6g5jCwA",
    authDomain: "surveydev-740fb.firebaseapp.com",
    databaseURL: "https://surveydev-740fb.firebaseio.com",
    projectId: "surveydev-740fb",
    storageBucket: "surveydev-740fb.appspot.com",
    messagingSenderId: "22198431343"
  }
*/

// TUOTANTO
var config = {
  apiKey: "AIzaSyDS-MRiDe76I3ctfc90sXtZPcjXRzO48IA",
  authDomain: "deploymentdb-eb155.firebaseapp.com",
  databaseURL: "https://deploymentdb-eb155.firebaseio.com",
  projectId: "deploymentdb-eb155",
  storageBucket: "deploymentdb-eb155.appspot.com",
  messagingSenderId: "901006585179"
};

var fire = firebase.initializeApp(config);

export default fire;
