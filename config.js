const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyDiwM4YuB3Ov5NohOpXT5vk12YY3ZhEMAc",
  authDomain: "koanodejs.firebaseapp.com",
  projectId: "koanodejs",
  storageBucket: "koanodejs.appspot.com",
  messagingSenderId: "633811908464",
  appId: "1:633811908464:web:8b18dd34abed67f4a941b5",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const Todos = db.collection("todos");

module.exports = {Todos};
