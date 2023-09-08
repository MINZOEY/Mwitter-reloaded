// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgQjX3JSSySIVGBPb0eM9v6DUpSHRz_m4",
  authDomain: "mwitter-d1c11.firebaseapp.com",
  projectId: "mwitter-d1c11",
  storageBucket: "mwitter-d1c11.appspot.com",
  messagingSenderId: "299255934841",
  appId: "1:299255934841:web:7b45da5be23e6c564549a8"
};

// Initialize Firebase /  config 옵션을 통해서 app을 생성
const app = initializeApp(firebaseConfig);

// 그리고 그 app에 대한 인증서비스를 사용하고 싶다!
export const auth = getAuth(app);

export const storage= getStorage(app);

export const db = getFirestore(app);