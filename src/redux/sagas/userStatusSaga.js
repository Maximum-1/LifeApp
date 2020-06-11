// User Status saga
import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

// saga to update the user status on their first time status
// Saga: will be fired on "UPDATE_USER" actions
function* updateUser() {
    try {
        const response = yield axios.put('/api/user/update-status');
    } catch (error) {
        console.log('Update user status request failed', error);
    }
  }

function* userStatusSaga() {
    yield takeLatest('UPDATE_USER', updateUser);
  }
  
  export default userStatusSaga;