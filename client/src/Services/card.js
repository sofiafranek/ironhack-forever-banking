import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/cards'
});

const cards = async () => {
  try {
    const result = await instance.get('/');
    const cards = result.data.card;
    return cards;
  } catch (error) {
    throw error;
  }
};

const Usercards = async (userID) => {
  try {
    const result = await instance.get(`/${userID}/user-cards`);
    const cards = result.data.card;
    return cards;
  } catch (error) {
    throw error;
  }
};

// creating a card to add to user account
const creatingCard = async (data) => {
  try {
    const result = await instance.post('/create-card', data);
    const card = result.data.card;
    return card;
  } catch (error) {
    throw error;
  }
};

const singleCard = async (id) => {
  try {
    const result = await instance.get(`/${id}`);
    const card = result.data.card;
    return card;
  } catch (error) {
    throw error;
  }
};

// deleting card from users account
const deleteCard = async (accountID) => {
  try {
    await instance.post(`/${accountID}/delete-card`);
  } catch (error) {
    throw error;
  }
};

export { cards, creatingCard, singleCard, Usercards, deleteCard };
