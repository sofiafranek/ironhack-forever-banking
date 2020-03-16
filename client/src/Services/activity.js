import axios from 'axios';

const instance = axios.create({
  baseURL: '/api'
});

// shows all the accounts that exist in the database
const activity = () =>
  new Promise((resolve, reject) => {
    instance
      .get('/activity')
      .then(result => {
        const accounts = result.data.accounts;
        resolve(accounts);
      })
      .catch(reject);
  });

export { activity };
