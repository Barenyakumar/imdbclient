import axios from 'axios';

export default axios.create({
  baseURL: 'https://imdbserver-1.onrender.com' 
  // baseURL: 'http://localhost:8000' // Change if your backend runs on a different URL/port
});
