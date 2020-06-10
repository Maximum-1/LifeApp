import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addItemSaga() {
    yield takeLatest('ADD_TREE', addTree);
}

function* addTree(action) {
    try {
        const response = yield axios.post('/api/tree', action.payload);
        console.log('response data from post TREE', response.data);

        yield put({ type: 'GET_TREE' });
    } catch (error) {
        console.log('post item to server failed', error);
    }
}

export default addItemSaga;
