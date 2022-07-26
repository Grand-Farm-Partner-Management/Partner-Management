const newPartnerReducer = (state = [], action) => {
    switch (action.type) {
      case 'NEW_PARTNER':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default newPartnerReducer;