// Add Tree Saga
import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


// addITEMSaga: will be fired on "ADD_TREE" actions
function* addTree(action) {
    try {
        const response = yield axios.post('/api/tree', action.payload);
        yield put({ type: 'GET_TREE' });
    } catch (error) {
        console.log('post item to server failed', error);
    }
}

function* addItemSaga() {
    yield takeLatest('ADD_TREE', addTree);
}

export default addItemSaga;
