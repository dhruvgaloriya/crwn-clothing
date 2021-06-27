import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDIrOomwE8d6sHhnRB-WxML1p1u5HXJPfw",
  authDomain: "reactjs-2b1a0.firebaseapp.com",
  databaseURL: "https://reactjs-2b1a0.firebaseio.com",
  projectId: "reactjs-2b1a0",
  storageBucket: "reactjs-2b1a0.appspot.com",
  messagingSenderId: "957842699217",
  appId: "1:957842699217:web:d42aef604252652924a6f0"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;