import { FETCH_ALL,FETCH_ONE, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
import * as api from '../api/vehicule';

export const getVehicules = () => async (dispatch) => {
  try {
    const { data } = await api.getVehicules();
    console.log(data);
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createVehicule = (reservation,setMessage) => async (dispatch) => {
  try {
    const { data } = await api.createVehicule(reservation);

    dispatch({ type: CREATE, payload: data });
    setMessage("Vehicule created with success !");
  } catch (error) {
    console.log(error.message);
  }
};

export const updateVehicule = (id, reservation,setMessage) => async (dispatch) => {
  try {
    const { data } = await api.updateVehicule(id, reservation);

    dispatch({ type: UPDATE, payload: data });
    setMessage("vehicule updated with success !");
  } catch (error) {
    if (error.message==="Request failed with status code 404")
      setMessage("Select a vehicule to update !");
    console.log(error.message);
  }
};

export const getVehicule = (id) => async (dispatch) => {
    try {
        const { data } = await api.getVehicule(id);
    
        dispatch({ type: FETCH_ONE, payload: data });
      } catch (error) {
        console.log(error.message);
      }
};

export const deleteVehicule = (id,setMessage) => async (dispatch) => {
  try {
    await await api.deleteVehicule(id);

    dispatch({ type: DELETE, payload: id });
    setMessage("Vehicle deleted with success !");
  } catch (error) {
    if (error.message==="Request failed with status code 404")
      setMessage("Select a vehicule to delete !");
    console.log(error.message);
  }
};
