const unassignedReducer = (state = [], action) => {
    switch (action.type) {
      case 'UNASSIGNED':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default unassignedReducer;