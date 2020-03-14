import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/transaction'
});

const createTransaction = data =>
  new Promise((resolve, reject) => {
    instance
      .post('/add-transaction', data)
      .then(result => {
        const account = result.data.account;
        resolve(account);
      })
      .catch(reject);
  });

const receivedTransactions = id =>
  new Promise((resolve, reject) => {
    instance
      .get(`/${id}/received`)
      .then(result => {
        const transactions = result.data.transactions;
        resolve(transactions);
      })
      .catch(reject);
  });

const sentTransactions = id =>
  new Promise((resolve, reject) => {
    instance
        .get(`/${id}/sent`)
        .then(result => {
            const transactions = result.data.transactions;
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

export { createTransaction, receivedTransactions, sentTransactions, singleTransaction };
