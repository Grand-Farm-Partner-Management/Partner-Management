import { put, takeLatest } from 'redux-saga/effects';
import { select } from 'redux-saga/effects'; // access redux
import axios from 'axios';

function* projectSaga(){
    yield takeLatest('FETCH_PROJECT_DETAILS', fetchProjectDetails);
    yield takeLatest('FETCH_PROJECT', fetchProject);
    yield takeLatest('NEW_PROJECT', newProject);
    yield takeLatest('ASSIGN_PROJECT', assignProject);
    yield takeLatest('FETCH_COMPANY_PROJECT', fetchCompanyProject);
    yield takeLatest('UPDATE_PROJECT', updateProject);
    yield takeLatest('PROGRESS_PROJECT', progressProject);
    yield takeLatest('DELETE_PROJECT', deleteProject);
}

function* fetchProjectDetails(action){
    try{
        const response = yield axios.get(`/api/project/projectDetails/${action.payload}`);
        yield put({type: 'SET_PROJECT_DETAILS', payload: response.data});//reducer needs to be made
    }catch{
        console.log('error in fetch project saga.');
    }
}//

//fetch projects
function* fetchProject(action){
    console.log('in fetch project saga');
    try{
        // access the user's company id from redux
        let companyId = yield select(store => store.user.company_id) || action.payload;
        const response = yield axios.get(`/api/project/${companyId}`);
        console.log('response in project company is:', response);
        yield put({type: 'GET_PROJECTS', payload: response.data});//reducer needs to be made
    }catch{
        console.log('error in fetch project saga.');
    }
}//

//add new projects
function* newProject(action){
    console.log('in fetch project saga');
    try{
        yield axios.post(`/api/project/${action.payload.user_id}`, action.payload);
        yield put({ type: 'FETCH_PROJECT'})
    }catch{
        console.log('error in new project saga.');
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
        yield put({type: 'GET_PROJECTS', payload: response.data});//reducer needs to be made
    }catch{
        console.log('error in fetch Company project saga.');
    }
}//

//update project info by id
function* updateProject(action){
    console.log('in update project saga');
    try{
        yield axios.put(`/api/project/${action.payload.project_id}/update`, action.payload);
        yield put({ type: 'FETCH_PROJECT_DETAILS', payload: action.payload.project_id })
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
    console.log('in delete project saga', action);
    try{
        yield axios.delete(`/api/project/${action.payload}/delete`)
        yield put({ type: 'FETCH_PROJECT'})
    }catch{
        console.log('error in delete project saga.');
    }
}

export default projectSaga;