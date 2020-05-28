import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getPhaseSaga() {
    yield takeLatest('GET_PHASE', getPhase);
}

function* getPhase() {
    try {
        console.log('in add get phase  generator funciton');
        const response = yield axios.get('/api/phase');
        yield put({ type: 'HOLD_PHASE', payload: response.data });

    } catch (error) {
        console.log('post phase to reducer failed', error);
    }
}



export default getPhaseSaga;
