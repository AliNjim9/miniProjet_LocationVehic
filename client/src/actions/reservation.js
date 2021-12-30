import { FETCH_ALL,FETCH_ONE, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
import * as api from '../api/reservation';

export const getReservations = () => async (dispatch) => {
  try {
    const { data } = await api.getReservations();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createReservation = (reservation,setMessage) => async (dispatch) => {
  try {
    const { data } = await api.createReservation(reservation);

    dispatch({ type: CREATE, payload: data });
    setMessage("Reservation created with success !");
  } catch (error) {
    console.log(error.message);
  }
};

export const updateReservation = (id, reservation,setMessage) => async (dispatch) => {
  try {
    const { data } = await api.updateReservation(id, reservation);

    dispatch({ type: UPDATE, payload: data });
    setMessage("Reservation updated with success !");
  } catch (error) {
    console.log(error.message);
  }
};

export const getReservation = (id) => async (dispatch) => {
    try {
        const { data } = await api.getReservation(id);
    
        dispatch({ type: FETCH_ONE, payload: data });
      } catch (error) {
        console.log(error.message);
      }
};
export const getReservationsClient = (client_id) => async (dispatch) => {
  try {
      const { data } = await api.getReservationsClient(client_id);
      console.log(data);
      dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
      console.log(error.message);
    }
};

export const deleteReservation = (id,setMessage) => async (dispatch) => {
  try {
    await await api.deleteReservation(id);

    dispatch({ type: DELETE, payload: id });
    setMessage("Reservation deleted with success !");
  } catch (error) {
    if (error.message==="Request failed with status code 404")
      setMessage("Select a reservation to delete !");
    console.log(error.message);
  }
};
