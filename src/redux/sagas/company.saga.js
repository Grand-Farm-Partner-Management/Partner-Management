import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* companySaga() {
    yield takeLatest('FETCH_COMPANY', fetchCompany);
    yield takeLatest('ADD_COMPANY', postCompany);
    yield takeLatest('FETCH_COMPANY_USERS', fetchCompanyUser);
    yield takeLatest('RENAME_COMPANY', renameCompany);
    yield takeLatest('UPDATE_LEVEL_COMPANY', updateLevelCompany);
    yield takeLatest('LOGO_COMPANY', logoCompany);
    yield takeLatest('DELETE_COMPANY', deleteCompany)
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

// updates company name
function* renameCompany(action){
    console.log('in update company saga');
    try{
        axios.put('api/company/:id', action.payload);
        const response = yield axios.get('/api/company')
        console.log('response in update company is:', response);
        yield put({type: 'SET_COMPANY', payload: response.data});//reducer needs to be made
    }catch{
        console.log('error in rename company saga.');
    }
}
// change partnership level
function* updateLevelCompany(action){
    console.log('in update company partner level saga');
    try{
        axios.put('api/company/partnerLevel/:id', action.payload);
        const response = yield axios.get('/api/company')
        console.log('response in update company is:', response);
        yield put({type: 'SET_COMPANY', payload: response.data});//reducer needs to be made
    }catch{
        console.log('error in rename company saga.');
    }
}

//update company for logo
function* logoCompany(action){
    console.log('in logo company saga');
    try{
        axios.put('api/company/:id', action.payload);
        const response = yield axios.get('/api/company')
        console.log('response in update company is:', response);
        yield put({type: 'SET_COMPANY', payload: response.data});//reducer needs to be made
    }catch{
        console.log('error in rename company saga.');
    }
}

//delete a company
function* deleteCompany(action){
    console.log('in delete company saga');
    try{
        axios.put('api/company/:id', action.payload);
        const response = yield axios.get('/api/company')
        console.log('response in update company is:', response);
        yield put({type: 'SET_COMPANY', payload: response.data});//reducer needs to be made
    }catch{
        console.log('error in rename company saga.');
    }
}

export default companySaga;