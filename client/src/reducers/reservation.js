import { FETCH_ALL, FETCH_ONE,CREATE, UPDATE, DELETE} from '../constants/actionTypes';

export default (reservations = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return [action.payload];
    case FETCH_ONE:
      return action.payload;
    case CREATE:
      return [...reservations, action.payload];
    case UPDATE:
      return reservations.map((reservation) => (reservation._id === action.payload._id ? action.payload : reservation));
    case DELETE:
      return reservations.filter((reservation) => reservation._id !== action.payload);
    default:
      return reservations;
  }
};

