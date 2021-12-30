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
export const getReservations = () => API.get('/reservation');
export const getReservation = (id) => API.get(`/reservation/${id}`);
export const getReservationsClient = (id) => API.get(`/reservation/client/${id}`);
export const createReservation = (newReservation) => API.post('/reservation',newReservation);
export const updateReservation = (id,updatedReservation) => API.patch(`/reservation/${id}`,updatedReservation);
export const deleteReservation = (id) => API.delete(`/reservation/${id}`);
