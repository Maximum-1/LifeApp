// Search Tree saga page
import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// search Tree saga to send in the search query keyword
function* searchTree(action) {
    try {
        const response = yield axios.get(`/api/tree/${action.payload}`);
        yield put({ type: 'ALL_TREE', payload: response.data })
    }
    catch (error) {
        console.log('Error with Search GET tree', error);
    }
}

function* searchTreeSaga() {
    yield takeLatest('SEARCH_TREE', searchTree);
}

export default searchTreeSaga;