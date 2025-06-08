import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const getPosts = () => apiClient.get('/posts');
export const getPostById = (id) => apiClient.get(`/posts/${id}`);

// ADICIONE APENAS ESTA LINHA
export const getUserById = (id) => apiClient.get(`/users/${id}`);