const ActiveTabReducer = (state = 0, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_TAB':
      return action.payload;
    default:
      return state;
  }
};

export default ActiveTabReducer;
