import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* searchTreeSaga() {
    yield takeLatest('SEARCH_TREE', searchTree);
}


function* searchTree(action) {
    console.log('in searchTreeSaga', action.payload);
    try {
        const response = yield axios.get(`/api/twitter/${action.payload}`);
        yield put({ type: 'GET_TREE', payload: response.data })
    }
    catch (error) {
        console.log('Error with Search GET tree', error);
    }
}

export default searchTreeSaga;