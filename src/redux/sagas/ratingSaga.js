// Rating saga
import { takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Rating saga for first rating
// Saga: will be fired on "FIRST_RATING" actions
function* firstRating(action) {
    try {
        //Sends delete request and tree ID to server
        yield axios.post(`/api/firstRating/${action.payload.tree_id}`, action.payload.firstRating);
    }
    catch (error) {
        console.log('error in firstRating Saga', error);
    }
}


// Rating saga for the last rating
// Saga: will be fired on "LAST_RATING" actions
function* lastRating(action) {
    try {
        //Sends delete request and tree ID to server
        yield axios.post(`/api/lastRating/${action.payload.tree_id}`, action.payload.lastRating);
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