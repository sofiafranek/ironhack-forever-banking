import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/accounts'
});

// shows all the accounts that exist in the database
const account = async () => {
  try {
    const result = await instance.get('/');
    const accounts = result.data.accounts;
    return accounts;
  } catch (error) {
    throw error;
  }
};

const userLinkedAccounts = async userID => {
  try {
    const result = await instance.get(`/${userID}/linked-accounts`);
    const sharedAccounts = result.data.sharedAccounts;
    return sharedAccounts;
  } catch (error) {
    throw error;
  }
}

const updatePrimaryAccount = async (data) => {
  try {
    const result = await instance.post('/update-primary-account', data);
    return result.data;
  } catch(error) {
    throw error;
  }
}

// creating a user account when they sign up
const creatingAccountFromInternal = async (data) => {
  try {
    const result = await instance.post('/create-account-internal', data);
    return result.data;
  } catch (error) {
    throw error;
  }
};

const creatingAccountFromExternal = async data => {
  try {
    const result = await instance.post('/create-account-external', data);
    return result.data;
  } catch (error) {
    throw error;
  }
};

// showing each accounts information on single account view
const singleAccount = async id => {
  try {
    const result = await instance.get(`/${id}`);
    const account = result.data.account;
    return account;
  } catch (error) {
    throw error;
  }
};

const topUpAccount = async data => {
  try {
    const result = await instance.post('/topUpAccount', data);
    const account = result.data.account;
    return account;
  } catch (error) {
    throw error;
  }
};

// deleting an account from users account
const deleteAccount = async accountID => {
  try {
    await instance.post(`/${accountID}/delete-account`);
  } catch (error) {
    throw error;
  }
};

// only showing the accounts that belong to that user
const userActiveAccounts = async userID => {
  try {
    const result = await instance.get(`/${userID}/accounts`);
    const accounts = result.data.accountsUser;
    return accounts;
  } catch (error) {
    throw error;
  }
};

const userActiveAccountsCards = async userID => {
  try {
    const result = await instance.get(`/${userID}/accountsAndCards`);
    const accounts = result.data.accounts;
    return accounts;
  } catch (error) {
    throw error;
  }
};

// all the accounts, incluing the non active
const userAccounts = async userID => {
  try {
    const result = await instance.get(`/${userID}/user-accounts`);
    const accounts = result.data.accounts;
    return accounts;
  } catch (error) {
    throw error;
  }
};

const addUserToAccount = async data => {
  try {
    const result = await instance.post('/add-user-to-account', data);
    return result.data.result;
  } catch (error) {
    throw error;
  }

};

export {
  account,
  creatingAccountFromInternal,
  creatingAccountFromExternal,
  deleteAccount,
  singleAccount,
  userActiveAccounts,
  userAccounts,
  updatePrimaryAccount,
  addUserToAccount,
  userLinkedAccounts,
  topUpAccount
};
