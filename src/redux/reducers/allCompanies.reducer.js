const allCompanyReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_COMPANY':
            console.log("in set all company.", action.payload);
            return action.payload;
        default:
            return state;
    }
};

export default allCompanyReducer;