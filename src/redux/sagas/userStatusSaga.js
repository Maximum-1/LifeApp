import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* updateUser() {
    try {
        console.log('in updateStatusSaga');
        const response = yield axios.put('/api/user/update-status');
    } catch (error) {
        console.log('Update user status request failed', error);
    }
  }


function* userStatusSaga() {
    yield takeLatest('UPDATE_USER', updateUser);
  }
  
  export default userStatusSaga;