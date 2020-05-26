const treeReducer = (state = [], action) => {
    console.log('in treeReducer');
    switch (action.type) {
        case 'TREE':
            return action.payload
        default:
            return state
    }
}


export default treeReducer;