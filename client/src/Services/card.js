import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/cards'
});

const cards = () =>
  new Promise((resolve, reject) => {
    instance
      .get('/')
      .then(result => {
        const cards = result.data.card;
        resolve(cards);
      })
      .catch(reject);
  });

const Usercards = userID =>
  new Promise((resolve, reject) => {
    instance
      .get(`/${userID}/user-cards`)
      .then(result => {
        const cards = result.data.card;
        console.log('services', cards);
        resolve(cards);
      })
      .catch(reject);
  });

// creating a card to add to user account
const creatingCard = data =>
  new Promise((resolve, reject) => {
    instance
      .post('/create-card', data)
      .then(result => {
        const card = result.data.card;
        resolve(card);
      })
      .catch(reject);
  });

const singleCard = id =>
  new Promise((resolve, reject) => {
    instance
      .get(`/${id}`)
      .then(result => {
        const card = result.data.card;
        resolve(card);
      })
      .catch(reject);
  });

// deleting card from users account
const deleteCard = accountID =>
  new Promise((resolve, reject) => {
    instance
      .post(`/${accountID}/delete-card`)
      .then(result => {
        console.log(result.data);
        resolve();
      })
      .catch(reject);
  });

export { cards, creatingCard, singleCard, Usercards, deleteCard };
