import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC5jCnKR2leeEY_mMObgqO8coPf0PdWBAU",

  authDomain: "e-commerce-fd2aa.firebaseapp.com",

  projectId: "e-commerce-fd2aa",

  storageBucket: "e-commerce-fd2aa.appspot.com",

  messagingSenderId: "948177472246",

  appId: "1:948177472246:web:c6bd1a79864caf0ccafad7",

  measurementId: "G-8SNT4X8W0Z",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);
export { storage, firebaseApp };
