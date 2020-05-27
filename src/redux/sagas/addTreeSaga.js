import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addItemSaga() {
    yield takeLatest('ADD_TREE', addTree);
}

function* addTree(action) {
    try {
        console.log('in add tree generator funciton');
        console.log('action.payload is', action.payload);
        yield axios.post('/api/tree', action.payload);
/*         yield put({ type: '' });
 */    } catch (error) {
        console.log('post item to server failed', error);
    }
}



export default addItemSaga;
