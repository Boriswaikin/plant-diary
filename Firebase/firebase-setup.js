// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//import { getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDdUWkdjKjeXfoVKERwyUUKH_OJ9SLw-G4",
	authDomain: "mobile-8fe62.firebaseapp.com",
	projectId: "mobile-8fe62",
	storageBucket: "mobile-8fe62.appspot.com",
	messagingSenderId: "9566864655",
	appId: "1:9566864655:web:7d0c9eb67e154b5cc6ea7a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage),
});
