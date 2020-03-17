import axios from 'axios';

const instance = axios.create({
  baseURL: '/api'
});

// shows all the accounts that exist in the database
const activity = userID =>
  new Promise((resolve, reject) => {
    instance
      .get(`/${userID}/activity`)
      .then(result => {
        const accountsUser = result.data.accountsUser;
        resolve(accountsUser);
      })
      .catch(reject);
  });

const summary = userID =>
  new Promise((resolve, reject) => {
    instance
      .get(`/${userID}/summary`)
      .then(result => {
        const information = result.data.information;
        resolve(information);
      })
      .catch(reject);
  });

export { activity, summary };
