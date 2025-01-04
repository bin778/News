import axios from 'axios';
import { ERROR_MESSAGE } from '../constant/error.js';

export const fetchNews = async (pageNumber, query) => {
  try {
    const response = await axios.get(`/api/news`, {
      params: { page: pageNumber, query },
    });
    return response.data.items;
  } catch {
    throw new Error(ERROR_MESSAGE.API.fetch);
  }
};
