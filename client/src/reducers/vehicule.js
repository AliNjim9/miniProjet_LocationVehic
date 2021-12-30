import { FETCH_ALL, FETCH_ONE,CREATE, UPDATE, DELETE} from '../constants/actionTypes';

export default (vehicules = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return [action.payload];
    case FETCH_ONE:
      return action.payload;
    case CREATE:
      return [...vehicules, action.payload];
    case UPDATE:
      return vehicules.map((vehicule) => (vehicule._id === action.payload._id ? action.payload : vehicule));
    case DELETE:
      return vehicules.filter((vehicule) => vehicule._id !== action.payload);
    default:
      return vehicules;
  }
};

