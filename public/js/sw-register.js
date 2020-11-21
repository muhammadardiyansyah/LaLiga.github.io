/* eslint-disable linebreak-style */
/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-plusplus */
/* eslint-disable no-mixed-operators */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
// REGISTER SERVICE WORKER
if ('serviceWorker' in navigator) {
  registerServiceWorker();
} else {
  console.log('ServiceWorker not support this browser.');
}

function registerServiceWorker() {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then(() => {
      console.log('Registry ServiceWorker Success');
    })
    .catch(() => {
      console.log('Registry ServiceWorker Failed');
    });
}

// mengubah string menjadi Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Periksa fitur Notification API
if ('Notification' in window) {
  requestPermission();
} else {
  console.error('Notification is not suport this browser.');
}

// Meminta ijin menggunakan Notification API
function requestPermission() {
  if ('Notification' in window) {
	  Notification.requestPermission().then((result) => {
      if (result === 'denied') {
		  console.log('Fiture notification not permission.');
		  return;
      } if (result === 'default') {
		  console.error('User close box dialog permission.');
		  return;
      }
      navigator.serviceWorker.ready
        .then(() => {
          if (('PushManager' in window)) {
            navigator.serviceWorker.getRegistration().then((registration) => {
              registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array('BFJ04CeIPCOeqYeE7VVWxXXeF_Wg4DD4zAJCaUGJX55nToF54XyZrMu2ofHvuoL4ZCnbQNrsWS6k1Bpv-3fMlK0'),
              }).then((subscribe) => {
                console.log('Success subscribe endpoint: ', subscribe.endpoint);
                console.log('Success subscribe p256dh key: ', btoa(String.fromCharCode.apply(
                  null, new Uint8Array(subscribe.getKey('p256dh')),
                )));
                console.log('Success subscribe auth key: ', btoa(String.fromCharCode.apply(
                  null, new Uint8Array(subscribe.getKey('auth')),
                )));
              }).catch((e) => {
                console.error('Can not subscribe ', e.message);
                return registerServiceWorker();
              });
            });
          }
        });
	  });
  }
}
