import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyASWOc4c-3HS8yR9iek3081I9MjnG7lB6s',
  authDomain: 'first-project-f2eee.firebaseapp.com',
  projectId: 'first-project-f2eee',
  storageBucket: 'first-project-f2eee.appspot.com',
  messagingSenderId: '231664634738',
  appId: '1:231664634738:web:29167c848c9982aa1b2beb',
  measurementId: 'G-SRR0K6T26S',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({
  prompt: 'select_account ',
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signOutUser = () => {
  signOut(auth);
};
export const createWithEmailPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmailPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
