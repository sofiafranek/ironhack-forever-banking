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
        console.log(result, 'result');
        const accountsUser = result.data.accountsUser;
        resolve(accountsUser);
      })
      .catch(reject);
  });

export { activity };
