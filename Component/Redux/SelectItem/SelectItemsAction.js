import firebase from 'firebase';
export const getSelectItem = () => {
  return dispatch => {
    firebase
      .database()
      .ref('items')
      .on('value', data => {
        dispatch({
          type: 'GET_SELECT_ITEMS',
          payload: data.toJSON(),
        });
      });
  };
};

export const setSelectItem = item => {
  return {
    type: 'SET_SELECT_ITEMS',
    payload: item,
  };
};
