import firebase from 'firebase';
//import firebaseui from 'firebaseui';


// DEVAUS:
var config = {
    apiKey: "AIzaSyB5vqwusAIVlRNqDhNHTej34XqO6g5jCwA",
    authDomain: "surveydev-740fb.firebaseapp.com",
    databaseURL: "https://surveydev-740fb.firebaseio.com",
    projectId: "surveydev-740fb",
    storageBucket: "surveydev-740fb.appspot.com",
    messagingSenderId: "22198431343"
  }

/*
  // TUOTANTO
  var config = {
    apiKey: "AIzaSyDS-MRiDe76I3ctfc90sXtZPcjXRzO48IA",
    authDomain: "deploymentdb-eb155.firebaseapp.com",
    databaseURL: "https://deploymentdb-eb155.firebaseio.com",
    projectId: "deploymentdb-eb155",
    storageBucket: "deploymentdb-eb155.appspot.com",
    messagingSenderId: "901006585179"
  };*/

/*
var config = {
    apiKey: "AIzaSyD4xO0rJiyRqzpTNfsElwA6gL85ctmwN4g",
    authDomain: "survey-87fc3.firebaseapp.com",
    databaseURL: "https://survey-87fc3.firebaseio.com",
    projectId: "survey-87fc3",
    storageBucket: "survey-87fc3.appspot.com",
    messagingSenderId: "805532426722"
  }
*/

  var fire = firebase.initializeApp(config);
  //var ui = new firebaseui.auth.AuthUI(firebase.auth());
/*
  ui.start('#firebaseui-auth-container', {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Other config options...
  });*/

export default fire;
