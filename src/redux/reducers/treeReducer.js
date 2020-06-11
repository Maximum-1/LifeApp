// One Tree Reducer
const treeReducer = (state = [], action) => {
    switch (action.type) {
        case 'ONE_TREE':
            return action.payload
        default:
            return state
    }
}


export default treeReducer;