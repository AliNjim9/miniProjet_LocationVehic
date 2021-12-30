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
export const updateTypeVehicule = (id,updatedReservation) => API.patch(`/typevehicule/${id}`,updatedReservation);
