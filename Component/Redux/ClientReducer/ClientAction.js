import {
  ADD_CLIENT,
  GET_CLIENT,
  GET_CLIENTS,
  DELETE_CLIENT,
  EDIT_CLIENT,
} from './ClientType';
import firebase from 'firebase';

// export const addClient = data => {
//   return {
//     type: ADD_CLIENT,
//     payload: data,
//   };
// };

// export const setIntial = data => {
//   return {
//     type: ADD_CLIENT,
//     payload: data,
//   };
// };

// export const getClient = data => {
//   return {
//     type: GET_CLIENT,
//     payload: data,
//   };
// };

const fetchclients = objData => {
  const objArr = Object.entries(objData);
  return objArr.map(([key, client]) => client);
};

export const getClients = () => {
  return dispatch => {
    firebase
      .database()
      .ref('clients')
      .on('value', data => {
        const objData = data.toJSON();
        const clients = objData ? fetchclients(objData) : false;
        dispatch({
          type: GET_CLIENTS,
          payload: clients,
        });
      });
  };
};

// export const deleteClient = () => {
//   return {
//     type: DELETE_CLIENT,
//   };
// };

// export const editClient = data => {
//   return {
//     type: EDIT_CLIENT,
//     payload: data,
//   };
// };
