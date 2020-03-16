import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/cards'
});

const cards = () =>
  new Promise((resolve, reject) => {
    instance
      .get('/')
      .then(result => {
        console.log(result);
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
        console.log(result);
        const cards = result.data.card;
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
        console.log(result);
        const card = result.data.card;
        resolve(card);
      })
      .catch(reject);
  });

export { cards, creatingCard, singleCard, Usercards };
