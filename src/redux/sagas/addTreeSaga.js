import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addItemSaga() {
    yield takeLatest('ADD_TREE', addTree);
}

function* addTree(action) {
    try {
        let id = action.payload.user_id;
        console.log('in add tree generator funciton');
        console.log('action.payload is', action.payload);
        const response = yield axios.post('/api/tree', action.payload);
        console.log('response data from post TREE', response.data);
        
        yield put({ type: 'GET_TREE', payload: id });
    } catch (error) {
        console.log('post item to server failed', error);
    }
}

export default addItemSaga;
