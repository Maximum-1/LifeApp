const phaseReducer = (state = [], action) => {
    switch (action.type) {
        case 'PHASE':
            return action.payload
        default:
            return state
    }
}


export default phaseReducer;