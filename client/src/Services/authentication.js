import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/authentication'
});

const signUp = data =>
  new Promise((resolve, reject) => {
    instance
      .post('/signup', data)
      .then(result => {
        console.log(result);
        const user = result.data.user;
        resolve(user);
      })
      .catch(reject);
  });

const signIn = data =>
  new Promise((resolve, reject) => {
    instance
      .post('/signin', data)
      .then(result => {
        console.log(result);
        const user = result.data.user;
        resolve(user);
      })
      .catch(reject);
  });

const signOut = () =>
  new Promise((resolve, reject) => {
    instance
      .post('/signout')
      .then(result => {
        console.log(result);
        resolve();
      })
      .catch(reject);
  });

export { signIn, signUp, signOut };
