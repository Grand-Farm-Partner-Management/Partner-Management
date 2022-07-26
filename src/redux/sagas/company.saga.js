import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* companySaga() {
    yield takeLatest('FETCH_COMPANY', fetchCompany);
    yield takeLatest('ADD_COMPANY', postCompany);
    yield takeLatest('FETCH_COMPANY_USERS', fetchCompanyUser);
    yield takeLatest('RENAME_COMPANY', renameCompany);
    yield takeLatest('UPDATE_LEVEL_COMPANY', updateLevelCompany);
    yield takeLatest('LOGO_COMPANY', logoCompany);
    yield takeLatest('DELETE_COMPANY', deleteCompany);
    yield takeLatest('FETCH_NEW_COMPANY', fetchNewCompany);
    yield takeLatest('ASSIGN_USER', assignUser);
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

//fetches the new companies to be accepted by Grand Farm
function* fetchNewCompany(action){
    console.log('in fetch new company saga');
    try{
        const response = yield axios.get('/api/company/newPartner')
        console.log('response in fetch new company is:', response);
        yield put({type: 'NEW_PARTNER', payload: response.data});//reducer needs to be made
    }catch{
        console.log('error in fetch company saga.');
    }
}

// adds new company to the company table 
function* postCompany(action){
    console.log('in post company saga');
    try{
        yield axios.post('api/company', action.payload);
        yield put({ type: 'FETCH_COMPANY'})
    }catch{
        console.log('error in post company saga.');
    }
}

//saga for fetching users in a specific company
function* fetchCompanyUser(action){
    console.log('in fetch company users');
    try{
        const response = yield axios.get(`/api/company/members/${action.payload.id}`)
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
        yield axios.put(`api/company/${action.payload.id}`, action.payload);
        yield put({ type: 'FETCH_COMPANY'})
    }catch{
        console.log('error in rename company saga.');
    }
}
// change partnership level
function* updateLevelCompany(action){
    console.log('in update company partner level saga');
    try{
        yield axios.put(`api/company/partnerLevel/${action.payload.id}`, action.payload);
        yield put({ type: 'FETCH_NEW_COMPANY'})
    }catch{
        console.log('error in rename company saga.');
    }
}

//update company for logo
function* logoCompany(action){
    console.log('in logo company saga');
    try{
        yield axios.put(`api/company/${action.payload.id}`, action.payload);
        yield put({ type: 'FETCH_COMPANY'})
    }catch{
        console.log('error in rename company saga.');
    }
}

//delete a company
function* deleteCompany(action){
    console.log('in delete company saga');
    try{
        yield axios.put(`api/company/${action.payload.id}`, action.payload);
        yield put({ type: 'FETCH_COMPANY'})
    }catch{
        console.log('error in rename company saga.');
    }
}

// change partnership level
function* assignUser(action){
    console.log(`in update user's company saga`);
    try{
        yield axios.put(`api/company/assign`, action.payload);
        yield put({ type: 'FETCH_NEW_COMPANY'})
    }catch{
        console.log('error in rename company saga.');
    }
}

export default companySaga;