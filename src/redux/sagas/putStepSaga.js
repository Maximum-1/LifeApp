import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

//Generator function that uses saga to ajax get request
//This saga will update the user's answer for a specific step on their tree
function* answerSaga(action){
    try {
        console.log('action.payload is', action.payload);
        //Making asyn AJAX (axios) request
        yield axios.put(`/api/step/update-step/${action.payload.tree_step_id}`, {answer: action.payload.answer});
        //Request information back from the server after change
        yield put({ type: 'FETCH_TREE_BY_ID', payload: action.payload.tree_id});
    } catch(error) {
        console.log('error with put request for adding notes', error);
    }
}

function* putStepSaga() {
    yield takeLatest('PUT_ANSWER', answerSaga);
}

export default putStepSaga;