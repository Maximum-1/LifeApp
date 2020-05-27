const stepReducer = (state = [], action) => {
    console.log('in stepReducer');
    switch (action.type) {
        case 'STEP':
            return action.payload
        default:
            return state
    }
}


export default stepReducer;