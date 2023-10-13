import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://apilink.com/',
});

export default axiosClient;