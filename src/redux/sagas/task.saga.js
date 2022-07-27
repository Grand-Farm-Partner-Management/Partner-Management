import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* taskSaga(){
    yield takeLatest('NEW_TASK', newTask);
    yield takeLatest('COMPLETE_TASK', completeTask);
    yield takeLatest('UNCOMPLETE_TASK', uncompleteTask);
    yield takeLatest('PROJECT_TASK', projectTask);
    yield takeLatest('DELETE_TASK', deleteTask);
}

// saga for post of new tasks
function* newTask(action){
    console.log('in Post task saga');
    try{
        yield axios.post(`/api/task/${action.payload.project_id}`, action.payload);
        yield put({ type: 'FETCH_PROJECT_DETAILS', payload: action.payload.project_id })
    }catch{
        console.log('error in post task saga.');
    }
}

// fetch project tasks
function* projectTask(action){
    console.log('in project task saga');
    try{
        const response = yield axios.get(`/api/task/projectTask/:id`);
        yield put({type: 'PROJECT_ID', payload: response.data});//reducer needs to be made
    }catch{
        console.log('error in post task saga.');
    }
}

// update to complete tasks
function* completeTask(action){
    console.log('in complete task saga');
    try{
        yield axios.put(`/api/task/${action.payload.completedBy}`, action.payload);
        yield put({ type: 'FETCH_PROJECT_DETAILS', payload: action.payload.projectId })
    }catch{
        console.log('error in post task saga.');
    }
}

// update to complete tasks
function* uncompleteTask(action){
    console.log('in complete task saga');
    try{
        yield axios.put(`/api/task/uncomplete/${action.payload.taskId}`);
        // yield put({ type: 'FETCH_TASKS', payload: action.payload.projectId})
        yield put({ type: 'FETCH_PROJECT_DETAILS', payload: action.payload.projectId })

    }catch{
        console.log('error in post task saga.');
    }
}

//delete task
function* deleteTask(action){
    console.log('in delete task saga');
    try{
        yield axios.delete(`/api/task/${action.payload.taskId}`)
        yield put({ type: 'FETCH_PROJECT_DETAILS', payload: action.payload.projectId })
    }catch{
        console.log('error in delete task saga.');
    }
}

export default taskSaga;