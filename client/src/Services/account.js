import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/accounts'
});

// shows all the accounts that exist in the database
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

// creating a user account when they sign up
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

// adding an account when user is signed up and already has an account
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

// showing each accounts information on single account view
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

// deleting an account from users account
const deleteAccount = accountID =>
  new Promise((resolve, reject) => {
    console.log('ACCOUNTID', accountID);
    instance
      .post(`/${accountID}/delete-account`)
      .then(result => {
        console.log(result);
        resolve();
      })
      .catch(reject);
  });

// only showing the accounts that belong to that user
const userIDAccounts = userID =>
  new Promise((resolve, reject) => {
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
