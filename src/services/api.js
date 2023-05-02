import axios from 'axios';

export default async (action, url, data = {}) => {
  try {
    const response = await axios[action](url, data);
    return response.data;
  } catch (err) {
    throw new Error ('An error occured');
  }
}