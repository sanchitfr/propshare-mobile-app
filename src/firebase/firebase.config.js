import firebase from 'firebase/app';
import 'firebase/firestore'; //for database
import 'firebase/auth'; // for authorisation

const config = {
    apiKey: "AIzaSyBgq7lnEtj3Nl6OGDpjhW_ouo6AoxSKT8c",
    authDomain: "mobile-app-997dd.firebaseapp.com",
    databaseURL: "https://mobile-app-997dd.firebaseio.com",
    projectId: "mobile-app-997dd",
    storageBucket: "mobile-app-997dd.appspot.com",
    messagingSenderId: "303418303516",
    appId: "1:303418303516:web:754cc224b6acbadf4aabd9"
};

//method to save data in our firestore DB
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    // userRef contains the documentReference object for the user that logged in, which is determined by the uid of the user.
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();


    //adding data to the DB
    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        // console.log(displayName, email);
        //creating data
        try{
            await userRef.set({
                displayName,
                email,
                ...additionalData
            });
        }catch(error){
            console.log("error adding data", error.message);
        }
        
    }
    return userRef;
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject)
    })
};

export const saveUserData = async (userAuth, additionalData) => {
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    console.log("in save user data", additionalData);
    try{
        await userRef.set({
            ...additionalData
    })}catch(error){
        console.log("error adding data", error.message);
    }; 
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;