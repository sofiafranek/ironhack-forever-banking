import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/accounts'
});

const account = data =>
  new Promise((resolve, reject) => {
    instance
      .post('/', data)
      .then(result => {
        console.log(result);
        const account = result.data.account;
        resolve(account);
      })
      .catch(reject);
  });

const singleAccount = data =>
  new Promise((resolve, reject) => {
    instance
      .post('/:id', data)
      .then(result => {
        console.log(result);
        const account = result.data.account;
        resolve(account);
      })
      .catch(reject);
  });

export { account, singleAccount };
