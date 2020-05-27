const phaseReducer = (state = [], action) => {
    console.log('in phaseReducer');
    switch (action.type) {
        case 'PHASE':
            return action.payload
        default:
            return state
    }
}


export default phaseReducer;