import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* membersSaga(){
    yield takeLatest('FETCH_MEMBERS', fetchMembers);
}

//fetch projects
function* fetchMembers(action){
    console.log('in fetch members saga');
    try{
        const response = yield axios.get(`/api/company/members/${action.payload}`);
        yield put({type: 'SET_MEMBERS', payload: response.data});//reducer needs to be made
    }catch{
        console.log('error in fetch members saga.');
    }
}//


export default membersSaga;