import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/transaction'
});

const createTransaction = data =>
  new Promise((resolve, reject) => {
    instance
      .post('/add-transaction', data)
      .then(result => {
        const transaction = result.data.transaction;
        console.log(transaction);
        resolve(transaction);
      })
      .catch(reject);
  });

const receivedTransactions = data =>
  new Promise((resolve, reject) => {
    console.log("RECEIVE", data);
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
    console.log("SENT", data);
    instance
        .post('/sent', data)
        .then(result => {
            const transactions = result.data.transactionsFrom;
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
