import { UPDATE, DELETE } from '../constants/actionTypes';
import * as api from '../api/localite';

  export const updateLocalite = (id, localite) => async (dispatch) => {
    try {
      const { data } = await api.updateLocalite(id, localite);
  
      dispatch({ type: UPDATE, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
  