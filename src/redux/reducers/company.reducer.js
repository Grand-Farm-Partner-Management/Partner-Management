const companyReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_COMPANY':
          console.log("in set company.", action.payload);
        return action.payload;
      default:
        return state;
    }
  };
  
  export default companyReducer;