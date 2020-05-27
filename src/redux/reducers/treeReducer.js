const treeReducer = (state = [], action) => {
    switch (action.type) {
        case 'TREE':
            return action.payload
        default:
            return state
    }
}


export default treeReducer;