const taskReducer = (state = [], action) => {
  switch (action.type) {
    case 'PROJECT_ID':
      return action.payload;
    default:
      return state;
  }
};

export default taskReducer;