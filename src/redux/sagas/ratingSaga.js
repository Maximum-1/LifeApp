import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* firstRating(action) {
    console.log('in firstRating Saga', action.payload)
    try {
        //Sends delete request and tree ID to server
        yield axios.post(`/api/firstRating/${action.payload.tree_id}`, action.payload.firstRating);
    }
    catch (error) {
        console.log('error in firstRating Saga', error);
    }
}



function* lastRating(action) {
    console.log('in lastRating Saga', action.payload)
    try {
        //Sends delete request and tree ID to server
        yield axios.post(`/api/lastRating/${action.payload.tree_id}`);
    }
    catch (error) {
        console.log('error in lastRating Saga', error);
    }
}



function* ratingSaga() {
    yield takeLatest('FIRST_RATING', firstRating);
    yield takeLatest('LAST_RATING', lastRating);

}

export default ratingSaga;