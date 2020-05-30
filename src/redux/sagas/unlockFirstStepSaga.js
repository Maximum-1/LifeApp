import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

//Generator function that uses saga to ajax get request
//This saga will unlock a step on a user's tree
function* unlockSaga(action){
    try {
        console.log('UNLOCK_STEP action.payload is', action.payload);
        //Making asyn AJAX (axios) request
        yield axios.put(`/api/step/unlock-step-1/${action.payload.tree_id}`, action.payload);
        //Request information back from the server after change
    } catch(error) {
        console.log('error with put request unlocking step', error);
    }
}

function* unlockFirstStepSaga() {
    yield takeLatest('UNLOCK_STEP', unlockSaga);
}

export default unlockFirstStepSaga;