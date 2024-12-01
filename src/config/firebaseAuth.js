import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3ODb4wayJMFx_BBfWSSj7GDbqv3Ep9JQ",
  authDomain: "swiggy-176ea.firebaseapp.com",
  projectId: "swiggy-176ea",
  storageBucket: "swiggy-176ea.firebasestorage.app",
  messagingSenderId: "91524608502",
  appId: "1:91524608502:web:479cba8d226be3370397d7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider()

export {auth,provider}