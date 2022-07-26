const taskReducer = (state = [], action) => {
  switch (action.type) {
    case 'PROJECT_ID':
      return action.payload;
      case 'CLEAR_ID':
        return [];
    default:
      return state;
  }
};

export default taskReducer;