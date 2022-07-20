import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* companySaga() {
    yield takeLatest('FETCH_COMPANY', fetchCompany)
}

function* fetchCompany(action){
    try{
        const response = yield axios.get('/api/company')
        console.log('response in fetch company is:', response);
        yield put({type: 'SET_COMPANY', payload: response.data});//reducer needs to be made
    }catch{
        console.log('error in fetch company saga.');
    }
}

export default companySaga;