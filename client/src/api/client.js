import axios from 'axios';

export const API =axios.create({baseURL : 'http://localhost:5000' }); 
/*
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });
*/
export const getClients = () => API.get('/client');
export const getClient = (id) => API.get(`/client/${id}`);
export const createClient = (newClient) => API.post('/client',newClient);
export const updateClient = (id,updatedClient) => API.patch(`/client/${id}`,updatedClient);
export const deleteClient = (id) => API.delete(`/client/${id}`);
