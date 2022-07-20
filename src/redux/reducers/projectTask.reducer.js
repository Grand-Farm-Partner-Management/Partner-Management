const projectTaskReducer = (state = [], action) => {
  switch (action.type) {
    case 'PROJECT_TASKS':
      return action.payload;
    default:
      return state;
  }
};

export default projectTaskReducer;