import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/analytics'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage';
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp({
    apiKey: "AIzaSyCGcQkZuN-OQ8gWIB8gMoLNYHbcV3M8D4M",
    authDomain: "project-4020d.firebaseapp.com",
    projectId: "project-4020d",
    storageBucket: "project-4020d.appspot.com",
    messagingSenderId: "287100374521",
    appId: "1:287100374521:web:888c3ad1a94f7426aa4128",
    measurementId: "G-YSGXB2YJB9"
});

firebase.auth().languageCode = 'ko'

const auth = firebase.auth()
const firestore = firebase.firestore()
const functions = firebase.app().functions('asia-northeast3')

export {auth, firestore, functions, firebase}
