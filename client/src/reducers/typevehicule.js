import {  FETCH_ONE,FETCH_ALL, UPDATE} from '../constants/actionTypes';

export default (typeVehicules = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return [action.payload];
    case FETCH_ONE:
      return action.payload;
    case UPDATE:
      return typeVehicules.map((typevehicule) => (typevehicule._id === action.payload._id ? action.payload : typevehicule));
    default:
      return typeVehicules;
  }
};

