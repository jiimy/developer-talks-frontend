// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/9.7.0/firebase-app-compat.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/9.7.0/firebase-messaging-compat.js");

// eslint-disable-next-line no-undef
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAyeJyirLMiGpDn8VYDse31NsOumQAbZjM",
  authDomain: "dtalks-41451.firebaseapp.com",
  projectId: "dtalks-41451",
  storageBucket: "dtalks-41451.appspot.com",
  messagingSenderId: "681796334883",
  appId: "1:681796334883:web:a4c1c6947ef78610cb8896",
  measurementId: "G-WYBMK9HYCV",
});

// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

// eslint-disable-next-line no-restricted-globals
self.addEventListener("install", function (e) {
  console.log("fcm sw install..");
  // eslint-disable-next-line no-restricted-globals
  self.skipWaiting();
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("activate", function (e) {
  console.log("fcm sw activate..");
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("push", function (e) {
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image, // 웹 푸시 이미지는 icon
    tag: resultData.tag,
  };

  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle, notificationOptions);
});

messaging.onBackgroundMessage(function (payload) {
  const notification = payload.notification;

  console.log("[firebase-messaging-sw.js] Received background message ", notification);

  const notificationTitle = notification.title;
  const notificationOptions = {
    body: notification.body,
    icon: "/firebase-logo.png", // 루트 경로 기준으로 접근
  };

  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle, notificationOptions);
});
