import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/authorization'
});

const listNotifications = userID =>
    new Promise((resolve, reject) => {
        instance
        .get(`/${userID}/list`)
        .then(result => {
            const notifications = result.data.notifications;
            resolve(notifications);
        })
        .catch(reject);
    });

const createNotification = data =>
    new Promise((resolve, reject) => {
    instance
        .post('/create-notification', data)
        .then(result => {
            const notification = result.data.notification;
            resolve(notification);
        })
        .catch(reject);
    });

export { listNotifications, createNotification };
