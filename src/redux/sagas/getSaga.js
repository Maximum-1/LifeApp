import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getTreeSaga(action) {
    console.log('in getTreeSaga, action.payload is');
    try {
        const response = yield axios.get(`/api/tree/`);
        // const response = yield axios.get(`/api/tree/`, action.payload);
        yield put({ type: 'ALL_TREE', payload: response.data })
    }
    catch (error) {
        console.log('Error with TREE GET', error);
    }
}

//getStepSaga
function* getStepSaga(action) {
    console.log('in getStepSaga', action.payload);
    try {
        const response = yield axios.get(`/api/step/phases/${action.payload}`);
        yield put({ type: 'ALL_STEPS', payload: response.data })
    }
    catch (error) {
        console.log('Error with STEP GET', error);
    }
}

function* getSingleStepSaga(action) {
    console.log('in getStepSaga', action.payload);
    try {
        const response = yield axios.get(`/api/step/${action.payload}`);
        yield put({ type: 'STEP', payload: response.data })
    }
    catch (error) {
        console.log('Error with STEP GET', error);
    }
}


function* getSaga() {
    yield takeLatest('GET_TREE', getTreeSaga);
    yield takeLatest('FETCH_TREE_BY_ID', getStepSaga);
    yield takeLatest('GET_SINGLE_STEP', getSingleStepSaga);

}

export default getSaga;