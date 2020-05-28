import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// getTreesaga
function* getTreeSaga(action) {
    console.log('in getTreeSaga, action.payload is', action.payload);
    try {
        const response = yield axios.get(`/api/tree/`);
        // const response = yield axios.get(`/api/tree/`, action.payload);
        yield put({ type: 'TREE', payload: response.data })
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
        yield put({ type: 'STEP', payload: response.data })
    }
    catch (error) {
        console.log('Error with STEP GET', error);
    }
}

//getPhaseSaga
function* getPhaseSaga(action) {
    console.log('in getPhaseSaga', action.payload);
    try {
        const response = yield axios.get(`/api/step/`);
        yield put({ type: 'PHASE', payload: response.data })
    }
    catch (error) {
        console.log('Error with PHASE GET', error);
    }
}


function* getSaga() {
    yield takeLatest('GET_TREE', getTreeSaga);
    yield takeLatest('FETCH_TREE_BY_ID', getStepSaga);
    yield takeLatest('GET_PHASE', getPhaseSaga);
}

export default getSaga;