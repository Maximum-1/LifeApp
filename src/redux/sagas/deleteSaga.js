import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* deleteTree(action) {
    console.log('in deleteTree', action.payload)
    try{
      //Sends delete request and tree ID to server
      yield axios.delete(`/api/admin/${action.payload.id}`);
      // The yield put will later be updated to reflect the GET reducer name
      // yield put({type: 'GET_TREE'})
    }
    catch(error) {
      console.log('Sorry, tree could not be deleted', error);
    }
}

function* deleteSaga() {
    yield takeLatest('DELETE_TREE', deleteTree);
}

export default deleteSaga;