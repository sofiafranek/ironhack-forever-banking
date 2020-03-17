import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/transaction'
});

const createTransaction = data =>
  new Promise((resolve, reject) => {
    instance
      .post('/add-transaction', data)
      .then(result => {
        const transaction = result.data;
        resolve(transaction);
      })
      .catch(reject);
  });

const createListTransactions = data =>
  new Promise((resolve, reject) => {
    instance
      .post('/add-list-transactions', data)
      .then(result => {
        console.log("HEREEEE")
        resolve();
      })
      .catch(reject);
  });

const receivedTransactions = data =>
  new Promise((resolve, reject) => {
    instance
      .post('/received', data)
      .then(result => {
        const transactions = result.data.transactionsTo;
        resolve(transactions);
      })
      .catch(reject);
  });

const sentTransactions = data =>
  new Promise((resolve, reject) => {
    instance
      .post('/sent', data)
      .then(result => {
        const transactions = result.data.transactionsFrom;
        resolve(transactions);
      })
      .catch(reject);
  });

const allTransactions = data =>
  new Promise((resolve, reject) => {
    instance
      .post('/all', data)
      .then(result => {
        const transactions = result.data.allTransactions;
        resolve(transactions);
      })
      .catch(reject);
});

const allTransactionsAccount = idAccount =>
  new Promise((resolve, reject) => {
    instance
      .get(`/${idAccount}/allTransactionsAccount`)
      .then(result => {
        const transactions = result.data.allTransactions;
        resolve(transactions);
      })
      .catch(reject);
});

const singleTransaction = id =>
  new Promise((resolve, reject) => {
    instance
      .get(`/${id}`)
      .then(result => {
        const transaction = result.data.transaction;
        resolve(transaction);
      })
      .catch(reject);
  });

export {
  createTransaction,
  receivedTransactions,
  sentTransactions,
  singleTransaction,
  allTransactions,
  createListTransactions,
  allTransactionsAccount
};
