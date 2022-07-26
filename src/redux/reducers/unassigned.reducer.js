const unassignedReducer = (state = [], action) => {
    switch (action.type) {
      case 'UNASSIGNED':
        console.log('unassigned reducer: ',action.payload);
        return action.payload;
      default:
        return state;
    }
  };
  
  export default unassignedReducer;