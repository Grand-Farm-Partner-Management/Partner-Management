import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* projectSaga(){
    yield takeLatest('FETCH_PROJECT', fetchProject)
}

function* fetchProject(action){
    console.log('in fetch project saga');
    try{
        const response = yield axios.get('/api/project')
        console.log('response in project company is:', response);
        yield put({type: 'SET_PROJECT', payload: response.data});//reducer needs to be made
    }catch{
        console.log('error in fetch project saga.');
    }
}

export default projectSaga;