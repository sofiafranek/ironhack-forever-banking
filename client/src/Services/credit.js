import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/credit'
});

// shows all the credit accounts that exist in the database
const account = async () => {
  try {
    const result = await instance.get('/');
    const accounts = result.data.accounts;
    return accounts;
  } catch (error) {
    throw error;
  }
};

// only showing the accounts that belong to that user
const userIDAccounts = async userID => {
  try {
    const result = await instance.get(`/${userID}/credit`);
    console.log(result, 'RESULT');
    const account = result.data;
    return account;
  } catch (error) {
    throw error;
  }
};

// when user applys for credit an account is created
const createAccount = async data => {
  try {
    const result = await instance.post('/apply-for-credit', data);
    const account = result.data.account;
    console.log(result, account, 'RESULT & ACCOUNT');
    return account;
  } catch (error) {
    throw error;
  }
};

export { account, userIDAccounts, createAccount };
