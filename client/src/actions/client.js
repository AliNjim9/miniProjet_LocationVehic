import { FETCH_ALL,FETCH_ONE, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
import * as api from '../api/client';

export const getClients = () => async (dispatch) => {
  try {
    const { data } = await api.getClients();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createClient = (client) => async (dispatch) => {
    try {
      const { data } = await api.createClient(client);
  
      dispatch({ type: CREATE, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
  
  export const updateClient = (id, client) => async (dispatch) => {
    try {
      const { data } = await api.updateClient(id, client);
  
      dispatch({ type: UPDATE, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
  
  export const getClient = (id) => async (dispatch) => {
      try {
          const { data } = await api.getClient(id);
      
          dispatch({ type: FETCH_ONE, payload: data });
        } catch (error) {
          console.log(error.message);
        }
  };
  
  export const deleteClient = (id) => async (dispatch) => {
    try {
      await await api.deleteClient(id);
  
      dispatch({ type: DELETE, payload: id });
    } catch (error) {
      console.log(error.message);
    }
  };
  