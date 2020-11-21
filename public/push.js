/* eslint-disable linebreak-style */
const webPush = require('web-push');

const vapidKeys = {
  publicKey: 'BFJ04CeIPCOeqYeE7VVWxXXeF_Wg4DD4zAJCaUGJX55nToF54XyZrMu2ofHvuoL4ZCnbQNrsWS6k1Bpv-3fMlK0',
  privateKey: 'O5lm7QCBJNrjMeY6cGR2ZdPHWyP7nZInzxo8sDK0Nmg',
};

webPush.setVapidDetails(
  'mailto:muhammadardiyansyah46@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey,
);
const pushSubscription = {
  endpoint: 'https://fcm.googleapis.com/fcm/send/dhpLSgtQ_IQ:APA91bETjaSqbp1NV75TfPq4wqpHYR1dDzpey8BGql5Gzujr_x8E9RqLBnPrD9fcqCqWn8Gi9cfG-r4rgghmBamn8W63ZaNuprrAWK0lgv4vTW8wNV9JHm0xDmF2b0bXSKeFoBjD6Kqo',
  keys: {
    p256dh: 'BGeMClPVaNztvw0Isvl83P83/OXv6tvxJ0eV+1ikW/H7+a6uvHh+f/RauNAx599tkBU6cVN527R+quoB3r7gzoE=',
    auth: 'ebNVJiNb7+Y8/IOONcOCHw==',
  },
};
const payload = 'Ada informasi terbaru dari liga spanyol yuk cek!';

const options = {
  gcmAPIKey: '950057867696',
  TTL: 60,
};
webPush.sendNotification(
  pushSubscription,
  payload,
  options,
);
