import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/transaction'
});

const createTransactionAccount = async (data) => {
  try {
    const response = await instance.post('/add-transaction', data);
    const result = response.data;
    return result;
  } catch (error) {
    throw error;
  }
};

const createTransactionPhone = async (data) => {
  try {
    const response = await instance.post('/add-transaction-phone', data);
    const result = response.data;
    return result;
  } catch (error) {
    throw error;
  }
};

const createListTransactions = async (data) => {
  try {
    await instance.post('/add-list-transactions', data);
  } catch (error) {
    throw error;
  }
};

const receivedTransactions = async (data) => {
  try {
    const result = await instance.post('/received', data);
    const transactions = result.data.transactionsTo;
    return transactions;
  } catch (error) {
    throw error;
  }
};

const sentTransactions = async (data) => {
  try {
    const result = await instance.post('/sent', data);
    const transactions = result.data.transactionsFrom;
    return transactions;
  } catch (error) {
    throw error;
  }
};

const allTransactions = async (data) => {
  try {
    const result = await instance.post('/all', data);
    const transactions = result.data.allTransactions;
    return transactions;
  } catch (error) {
    throw error;
  }
};

const allTransactionsAccount = async (idAccount) => {
  try {
    const result = await instance.get(`/${idAccount}/allTransactionsAccount`);
    const transactions = result.data.allTransactions;
    return transactions;
  } catch (error) {
    throw error;
  }
};

const singleTransaction = async (id) => {
  try {
    const result = await instance.get(`/${id}`);
    const transaction = result.data.transaction;
    return transaction;
  } catch (error) {
    throw error;
  }
};

export {
  createTransactionAccount,
  createTransactionPhone,
  receivedTransactions,
  sentTransactions,
  singleTransaction,
  allTransactions,
  createListTransactions,
  allTransactionsAccount
};
