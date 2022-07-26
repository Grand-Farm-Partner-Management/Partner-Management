const projectDetailReducer = (state = [], action) => {
    switch (action.type) {
      case 'GET_PROJECT_DETAILS':
        return action.payload;
        case 'CLEAR_PROJECT_DETAILS':
          return [];
      default:
        return state;
    }
  };

  export default projectDetailReducer;