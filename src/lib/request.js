import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.APP_API_URL
});

export default instance
