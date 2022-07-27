const documentReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_DOCUMENTS':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default documentReducer;