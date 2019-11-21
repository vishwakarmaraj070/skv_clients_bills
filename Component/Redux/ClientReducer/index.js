import {
  ADD_CLIENT,
  GET_CLIENT,
  GET_CLIENTS,
  DELETE_CLIENT,
  EDIT_CLIENT,
} from './ClientType';

const ClientReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CLIENTS:
      return action.payload;
    // case ADD_CLIENT:
    //   return [action.payload, ...state];
    // case EDIT_CLIENT:
    //   return (state = [...action.payload]);
    // case DELETE_CLIENT:
    //   return (state = action.payload);
    default:
      return state;
  }
};

export default ClientReducer;
