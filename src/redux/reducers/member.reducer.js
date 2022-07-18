const memberReducer = (state = [], action) => {
    switch (action.type) {
      case 'GET_MEMBERS':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default memberReducer;