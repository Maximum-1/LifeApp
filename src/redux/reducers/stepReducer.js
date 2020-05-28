const stepReducer = (state = [], action) => {
    switch (action.type) {
        case 'ALL_STEPS':
            return action.payload
        default:
            return state
    }
}


export default stepReducer;