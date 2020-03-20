import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/authentication'
});

const signUp = async (data) => {
  try {
    const result = await instance.post('/signup', data);
    const user = result.data.user;
    return user;
  } catch (error) {
    throw error;
  }
};

const signIn = async (data) => {
  try {
    const result = await instance.post('/signin', data)
    return result.data;
  } catch (error) {
    throw error;
  }
};

const signOut = async () => {
  try {
    await instance.post('/signout');
  } catch (error) {
    throw error;
  }
};

const loadUserInformation = async () => {
  try {
    const result = await instance.get('/userinformation');
    const user = result.data.user;
    return user;
  } catch (error) {
    throw error;
  }
};

export { signIn, signUp, signOut, loadUserInformation };
