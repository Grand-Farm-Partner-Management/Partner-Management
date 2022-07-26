const projectTaskReducer = (state = [], action) => {
  switch (action.type) {
    case 'PROJECT_TASKS':
      return action.payload;
      case 'CLEAR_PROJECT_TASKS':
        return;
    default:
      return state;
  }
};

export default projectTaskReducer;