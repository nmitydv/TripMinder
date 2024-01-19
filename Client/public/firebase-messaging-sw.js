importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');
const firebaseConfig = {
    apiKey: 'AIzaSyBFlxRKkwFImunmhBLLQQpdo3daLpHOA7g',
    authDomain: 'apna-yatri-001.firebaseapp.com',
    projectId: 'apna-yatri-001',
    storageBucket: 'apna-yatri-001.appspot.com',
    messagingSenderId: '16947168351',
    appId: '1:16947168351:web:ae92a3e527270c9ce387ea',
    measurementId: 'G-91D2SVGKBV',
    databaseURL: 'https://apna-yatri-001-default-rtdb.firebaseio.com',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = { body: payload.notification.body };

  self.registration.showNotification(notificationTitle, notificationOptions);
});