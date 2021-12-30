import { UPDATE } from '../constants/actionTypes';
import * as api from '../api/typevehicule';

export const updateTypeVehicule = (id, typevehicule,setMessage) => async (dispatch) => {
  try {
    const { data } = await api.updateTypeVehicule(id, typevehicule);

    dispatch({ type: UPDATE, payload: data });
    setMessage("Type_Vehicule updated with success !");
  } catch (error) {
    console.log(error.message);
  }
};


