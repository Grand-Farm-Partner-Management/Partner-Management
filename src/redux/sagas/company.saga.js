import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* companySaga() {
    yield takeLatest('FETCH_COMPANY', fetchCompany);
    yield takeLatest('FETCH_ALL_COMPANIES', fetchAllCompanies);
    yield takeLatest('ADD_COMPANY', postCompany);
    yield takeLatest('FETCH_COMPANY_USERS', fetchCompanyUser);
    yield takeLatest('RENAME_COMPANY', renameCompany);
    yield takeLatest('UPDATE_LEVEL_COMPANY', updateLevelCompany);
    yield takeLatest('LOGO_COMPANY', logoCompany);
    yield takeLatest('DELETE_COMPANY', deleteCompany);
    yield takeLatest('FETCH_NEW_COMPANY', fetchNewCompany);
    yield takeLatest('ASSIGN_USER', assignUser);
    yield takeLatest('FETCH_UNASSIGNED', fetchUnassigned);
    yield takeLatest('FETCH_NEW_PARTNER', fetchNewPartner);
}

function* fetchAllCompanies(action) {
    console.log('in fetch company saga');
    try {
        const response = yield axios.get(`/api/company/all`)
        console.log('response in fetch all company is:', response);
        yield put({ type: 'SET_ALL_COMPANY', payload: response.data });//reducer needs to be made
    } catch {
        console.log('error in fetch company saga.');
    }
}

// fetches one specific company
function* fetchCompany(action) {
    console.log('in fetch company saga');
    try {
        const response = yield axios.get(`/api/company/singleCompany/${action.payload}`)
        console.log('response in fetch company is:', response);
        
        yield put({ type: 'SET_COMPANY', payload: response.data });//reducer needs to be made
    } catch {
        console.log('error in fetch company saga.');
    }
}

//fetches the new companies to be accepted by Grand Farm
function* fetchNewCompany(action) {
    console.log('in fetch new company saga', action );
    try {
        const response = yield axios.get('/api/company/newPartner')
        console.log('response in fetch new company is:', response);
        yield put({ type: 'NEW_PARTNER', payload: response.data });//reducer needs to be made
    } catch {
        console.log('error in fetch company saga.');
    }
}

// adds new company to the company table 
function* postCompany(action) {
    console.log('in post company saga', action);
    try {
        const response = yield axios.post(`api/company`, action.payload);
        console.log('saga respone', response.data)
        yield put({ type: 'FETCH_COMPANY', payload: response.data})
    } catch {
        console.log('error in post company saga.');
    }
}

//saga for fetching users in a specific company
function* fetchCompanyUser(action) {
    console.log('in fetch company users');
    try {
        const response = yield axios.get(`/api/company/members/${action.payload.id}`)
        console.log('response in fetch company users is:', response);
        yield put({ type: 'SET_COMPANY_USER', payload: response.data });
    } catch {
        console.log('error in fetch company users saga.');
    }
}

// updates company name
function* renameCompany(action) {
    console.log('in update company saga');
    try {
        yield axios.put(`api/company/${action.payload.id}`, action.payload);
        yield put({ type: 'FETCH_COMPANY' })
    } catch {
        console.log('error in rename company saga.');
    }
}
// change partnership level
function* updateLevelCompany(action) {
    console.log('in update company partner level saga');
    try {
        yield axios.put(`api/company/partnerLevel/${action.payload.id}`, action.payload);
        yield put({ type: 'FETCH_NEW_COMPANY' });
        yield put({ type: 'FETCH_COMPANY' });
    } catch {
        console.log('error in rename company saga.');
    }
}

//update company for logo
function* logoCompany(action) {
    console.log('in logo company saga');
    try {
        yield axios.put(`api/company/${action.payload.id}`, action.payload);
        yield put({ type: 'FETCH_COMPANY' })
    } catch {
        console.log('error in company logo saga.');
    }
}

//delete a company
function* deleteCompany(action) {
    console.log('in delete company saga');
    try {
        yield axios.delete(`api/company/${action.payload.id}`);
        yield put({ type: 'FETCH_COMPANY' });
        yield put({ type: 'FETCH_NEW_COMPANY'});
    } catch {
        console.log('error in delete company saga.');
    }
}

// add user to company 
function* assignUser(action) {
    console.log(`in update user's company saga`);
    try {
        yield axios.put(`api/company/assign`, action.payload);
        yield put({ type: 'FETCH_UNASSIGNED' })
        yield put({ type: 'FETCH_ALL_USER' })
    } catch {
        console.log('error assign saga.');
    }
}
// grabs users that don't belong to a company
function* fetchUnassigned(action) {
    console.log('in fetch unassigned')
    try {
        console.log(" ----- fetch unassigned before the get ");
        const response = yield axios.get(`/api/company/unassigned`)
        console.log("]]] response in fetch un assigned", response.data);
        yield put({ type: `UNASSIGNED`, payload: response.data });
    } catch {
        console.log('error fetch unassigned saga.');
    }
}

// to get the new partners
function* fetchNewPartner(action){
    console.log("in fetch new partner");
    try {
        const response = yield axios.get(`/api/company/newPartner`)
        yield put({ type: `NEW_PARTNERS`, payload: response.data });
    } catch {
        console.log('error fetch unassigned saga.');
    }
}
export default companySaga;