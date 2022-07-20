import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* companySaga() {
    yield takeLatest('FETCH_COMPANY', fetchCompany);
    yield takeLatest('ADD_COMPANY', postCompany);
    yield takeLatest('FETCH_COMPANY_USERS', fetchCompanyUser);
}

// fetches the companies
function* fetchCompany(action){
    console.log('in fetch company saga');
    try{
        const response = yield axios.get('/api/company')
        console.log('response in fetch company is:', response);
        yield put({type: 'SET_COMPANY', payload: response.data});//reducer needs to be made
    }catch{
        console.log('error in fetch company saga.');
    }
}

// adds new company to the company table 
function* postCompany(action){
    console.log('in post company saga');
    try{
        axios.post('api/company', action.payload);
        const response = yield axios.get('/api/company')
        console.log('response in fetch company is:', response);
        yield put({type: 'SET_COMPANY', payload: response.data});//reducer needs to be made
    }catch{
        console.log('error in post company saga.');
    }
}

//saga for fetching users in a specific caompany
function* fetchCompanyUser(action){
    console.log('in fetch company users');
    try{
        const response = yield axios.get('/api/company/members/:id')
        console.log('response in fetch company users is:', response);
        yield put({type: 'SET_COMPANY_USER', payload: response.data});//reducer needs to be made
    }catch{
        console.log('error in fetch company users saga.');
    }
}

export default companySaga;