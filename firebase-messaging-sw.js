importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js');
firebase.initializeApp({ 
    apiKey: "AIzaSyBY7D2ZqoawQBqYHjmS9rcpHWBXXtvyT7A",
    authDomain: "jabalmet.firebaseapp.com",
    databaseURL: "https://jabalmet.firebaseio.com",
    projectId: "jabalmet",
    storageBucket: "jabalmet.appspot.com",
    messagingSenderId: "973738274082",
    appId: "1:973738274082:web:77be6568b20a9ad44b897b",
    measurementId: "G-YZT27E22ER"
  
});
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            return registration.showNotification("New Message");
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});