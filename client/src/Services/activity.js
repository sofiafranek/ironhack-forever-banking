import axios from 'axios';

const instance = axios.create({
  baseURL: '/api'
});

// shows all the accounts that exist in the database
const activity = async (userID) => {
  try {
    const result = await instance.get(`/${userID}/activity`);
    const activity = result.data.activity;
    return activity;
  } catch (error) {
    throw error;
  }
};

const summary = async (userID) => {
  try {
    const result = await instance.get(`/${userID}/summary`);
    const information = result.data.information;
    return information;
  } catch (error) {
    throw error;
  }
};

export { activity, summary };
