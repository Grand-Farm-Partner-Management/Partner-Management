import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* projectSaga(){
    yield takeLatest('FETCH_PROJECT', fetchProject);
    yield takeLatest('NEW_PROJECT', newProject);
    yield takeLatest('ASSIGN_PROJECT', assignProject);
    yield takeLatest('FETCH_COMPANY_PROJECT', fetchCompanyProject);
    yield takeLatest('UPDATE_PROJECT', updateProject);
    yield takeLatest('PROGRESS_PROJECT', progressProject);
    yield takeLatest('DELETE_PROJECT', deleteProject);
}

//fetch projects
function* fetchProject(action){
    console.log('in fetch project saga');
    try{
        const response = yield axios.get('/api/project');
        console.log('response in project company is:', response);
        yield put({type: 'GET_PROJECT', payload: response.data});//reducer needs to be made
    }catch{
        console.log('error in fetch project saga.');
    }
}//

//add new projects
function* newProject(action){
    console.log('in fetch project saga');
    try{
        yield axios.post(`/api/project/${action.payload.id}`);
        yield put({ type: 'FETCH_PROJECT'})
    }catch{
        console.log('error in fetch project saga.');
    }
}//

// assign user to project
function* assignProject(action){
    console.log('in assign project saga');
    try{
        yield axios.post(`/api/project${action.payload.id}/assign`);
        yield put({ type: 'FETCH_PROJECT'})
    }catch{
        console.log('error in assign project saga.');
    }
}//

//fetch projects for specific company
function* fetchCompanyProject(action){
    console.log('in fetch Company project saga');
    try{
        const response = yield axios.get(`/api/project${action.payload.id}`);
        console.log('response in project company is:', response);
        yield put({type: 'GET_PROJECT', payload: response.data});//reducer needs to be made
    }catch{
        console.log('error in fetch Company project saga.');
    }
}//

//update project info by id
function* updateProject(action){
    console.log('in update project saga');
    try{
        yield axios.put(`api/project/${action.payload.id}/update`);
        yield put({ type: 'FETCH_PROJECT' })
    }catch{
        console.log('error in update project saga.');
    }
}//

//update project progress
function* progressProject(action){
    console.log('in progress project saga');
    try{
        yield axios.put(`/api/project/${action.payload.id}/progress`);
        yield put({ type: 'FETCH_PROJECT'})
    }catch{
        console.log('error in progress project saga.');
    }
}

//delete project
function* deleteProject(action){
    console.log('in delete project saga');
    try{
        yield axios.delete(`/api/project/${action.payload.id}/delete`)
        yield put({ type: 'FETCH_PROJECT'})
    }catch{
        console.log('error in delete project saga.');
    }
}

export default projectSaga;