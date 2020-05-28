const stepReducer = (state = [], action) => {
    console.log('in hold Phase');
    switch (action.type) {
        case 'HOLD_PHASE':
            return action.payload
        default:
            return state
    }
}


export default stepReducer;