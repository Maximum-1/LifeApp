// All Tree Reducer
const allTreesReducer = (state = [], action) => {
    switch (action.type) {
        case 'ALL_TREE':
            return action.payload
        default:
            return state
    }
}


export default allTreesReducer;