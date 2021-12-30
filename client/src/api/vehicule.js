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
export const getVehicules = () => API.get('/vehicule');
export const getVehicule = (id) => API.get(`/vehicule/${id}`);
export const createVehicule = (newVehicule) => API.post('/vehicule',newVehicule);
export const updateVehicule = (id,updatedVehicule) => API.patch(`/vehicule/${id}`,updatedVehicule);
export const deleteVehicule = (id) => API.delete(`/vehicule/${id}`);
