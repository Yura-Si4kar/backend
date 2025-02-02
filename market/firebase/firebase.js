const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
 
const firebaseConfig = {
  apiKey: "AIzaSyAUPvM185qsaTw6ZCTYy8059MEKUD3tJkU",
  authDomain: "shop-8912a.firebaseapp.com",
  projectId: "shop-8912a",
  storageBucket: "shop-8912a.appspot.com",
  messagingSenderId: "407070146149",
  appId: "1:407070146149:web:de2fa2856f835a9db7908c"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const signInUser = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
}

module.exports = {signInUser};