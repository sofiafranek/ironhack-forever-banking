import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/accounts'
});

const account = () =>
  new Promise((resolve, reject) => {
    instance
      .get('/')
      .then(result => {
        const accounts = result.data.accounts;
        resolve(accounts);
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

const addAccount = data =>
  new Promise((resolve, reject) => {
    instance
      .post('/add-account', data)
      .then(result => {
        console.log('adding account');
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
        const account = result.data.account;
        resolve(account);
      })
      .catch(reject);
  });

const deleteAccount = id =>
  new Promise((resolve, reject) => {
    instance
      .get('/delete-account', id)
      .then(result => {
        console.log(result);
      })
      .catch(reject);
  });

const userIDAccounts = userID =>
  new Promise((resolve, reject) => {
    console.log('ACCOUNTID', userID);
    instance
      .get(`/${userID}/accounts`)
      .then(result => {
        const account = result.data.accountsUser;
        resolve(account);
      })
      .catch(reject);
  });

const userAccounts = userID =>
  new Promise((resolve, reject) => {
    instance
      .get(`/${userID}/user-accounts`)
      .then(result => {
        const accounts = result.data.accounts;
        resolve(accounts);
      })
      .catch(reject);
  });

export {
  account,
  addAccount,
  creatingAccount,
  deleteAccount,
  singleAccount,
  userIDAccounts,
  userAccounts
};
