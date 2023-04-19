/**
 * @format
 */

 import {AppRegistry} from 'react-native';
 import App from './App';
 import {name as appName} from './app.json';
 import firestore, { firebase } from '@react-native-firebase/firestore';
 import i18n from './src/screens/translation/i18n';
 
 
 const iosConfig = {
     clientId: '497356372443-uofvqilqd5rjefns3g1gbh444uiikuck.apps.googleusercontent.com',
     appId: '1:497356372443:ios:6ab983046bdd8c75148ffe',
     apiKey: 'AIzaSyBx9ohn1QIdHxbgdORYbtL2nfnf4CzBN_0',
    databaseURL: 'https://heybuddies-4ab8b-default-rtdb.firebaseio.com',
     storageBucket: 'heybuddies-4ab8b.appspot.com',
     messagingSenderId: '497356372443',
     projectId: 'heybuddies-4ab8b',
     persistence: false,
   }
     firebase.initializeApp(iosConfig);
    //  firebase.initializeApp(iosConfig);
 
 AppRegistry.registerComponent(appName, () => App,i18n);
 


// /**
//  * @format
//  */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';
// import firestore, { firebase } from '@react-native-firebase/firestore';
// import i18n from './src/screens/translation/i18n';


// const iosConfig = {
//     clientId: '497356372443-uofvqilqd5rjefns3g1gbh444uiikuck.apps.googleusercontent.com',
//     appId: '1:497356372443:ios:6ab983046bdd8c75148ffe',
//     apiKey: 'AIzaSyBx9ohn1QIdHxbgdORYbtL2nfnf4CzBN_0',
//     databaseURL: 'https://heybuddies-4ab8b-default-rtdb.firebaseio.com',
//     storageBucket: 'heybuddies-4ab8b.appspot.com',
//     messagingSenderId: '497356372443',
//     projectId: 'heybuddies-4ab8b',
//     persistence: true,
//   }
//   firebase.initializeApp(iosConfig);

// AppRegistry.registerComponent(appName, () => App,i18n);
