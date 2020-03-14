import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/accounts'
});

const account = data =>
  new Promise((resolve, reject) => {
    instance
      .get('/', data)
      .then(result => {
        console.log(result);
        const account = result.data.account;
        resolve(account);
      })
      .catch(reject);
  });

const creatingAccount = data =>
  new Promise((resolve, reject) => {
    instance
      .post('/create-account', data)
      .then(result => {
        const account = result.data.account;
        resolve(account);
      })
      .catch(reject);
  });



const singleAccount = id =>
  new Promise((resolve, reject) => {
    instance
      .get(`/${id}`)
      .then(result => {
        console.log(result);
        const account = result.data.account;
        resolve(account);
      })
      .catch(reject);
  });

export { account, creatingAccount, singleAccount };
