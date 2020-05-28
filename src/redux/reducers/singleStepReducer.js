const singleStepReducer = (state = {}, action) => {
    switch (action.type) {
        case 'STEP':
            return action.payload
        default:
            return state
    }
}


export default singleStepReducer;