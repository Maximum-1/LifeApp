import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* deleteTree(action) {
    console.log('in deleteTree', action.payload)
    try{
      //Sends delete request and tree ID to server
      let id = action.payload.user_id;
      yield axios.delete(`/api/tree/${action.payload.tree_id}`);
      yield put({ type: 'GET_TREE', payload: id });
    }
    catch(error) {
      console.log('Sorry, tree could not be deleted', error);
    }
}

function* deleteSaga() {
    yield takeLatest('DELETE_TREE', deleteTree);
}

export default deleteSaga;