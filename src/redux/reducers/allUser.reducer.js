const allUserReducer = (state = [], action) => {
    switch (action.type) {
      case 'ALL_USER':
        //console.log('--------All user reducer',action.payload);
        return action.payload;
      default:
        return state;
    }
  };
  
  export default allUserReducer;