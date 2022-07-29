import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* documentsSaga(){
    yield takeLatest('FETCH_DOCUMENTS', fetchDocuments);
    yield takeLatest('CREATE_DOCUMENT', createDocument);
    yield takeLatest('DELETE_DOCUMENT', deleteDocument);
}

//fetch documents
function* fetchDocuments(action){
    try{
        const response = yield axios.get(`/api/document/${action.payload}`)
        yield put({ type: `SET_DOCUMENTS`, payload: response.data });
    }catch{
        console.log('error in fetch documents saga.');
    }
}

function* createDocument(action){
    try{
        const response = yield axios.post(`/api/document/${action.payload.companyId}`, action.payload.body)
        yield put({ type: `FETCH_DOCUMENTS` });
    }catch{
        console.log('error in create documents saga.');
    }
}

function* deleteDocument(action){
    try{
        const response = yield axios.delete(`/api/document/${action.payload}`)
        yield put({ type: `FETCH_DOCUMENTS` });
    }catch{
        console.log('error in delete documents saga.');
    }
}

export default documentsSaga;