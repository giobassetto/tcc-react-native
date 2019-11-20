import axios from 'axios';

const api2 = axios.create({
  baseURL:
    'https://firestore.googleapis.com/v1/projects/names-database-448b8/databases/(default)/documents/names/tcc/',
});

export default api2;
