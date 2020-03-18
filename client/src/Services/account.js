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
    instance
      .post(`/${accountID}/delete-account`)
      .then(result => {
        console.log(result.data);
        resolve();
      })
      .catch(reject);
  });

// adding money to an account from users account
const addingMoney = data =>
  new Promise((resolve, reject) => {
    instance
      .post('/add-money', data)
      .then(() => {
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

// all the accounts, incluing the non active
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
  addingMoney,
  creatingAccount,
  deleteAccount,
  singleAccount,
  userIDAccounts,
  userAccounts
};
