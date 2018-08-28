importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');
//importScripts('/__/firebase/init.js');

//firebase.messaging();

var config = {
    apiKey: "AIzaSyAbvRV0aftE4Ifp6tgj-3NqnstZTmf_H-o",
    authDomain: "lourdes-sfc.firebaseapp.com",
    databaseURL: "https://lourdes-sfc.firebaseio.com",
    projectId: "lourdes-sfc",
    storageBucket: "lourdes-sfc.appspot.com",
    messagingSenderId: "495787725581"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
