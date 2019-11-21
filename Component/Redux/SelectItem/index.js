const SelectItemsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SELECT_ITEMS':
      return state;
    case 'GET_SELECT_ITEMS':
      return action.payload;
    default:
      return state;
  }
};

export default SelectItemsReducer;
