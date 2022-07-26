const projectReducer = (state = [], action) => {
    switch (action.type) {
      case 'GET_PROJECTS':
        return action.payload;
        case 'CLEAR_PROJECTS':
          return [];
      default:
        return state;
    }
  };

  export default projectReducer;