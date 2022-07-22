import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* taskSaga(){
    yield takeLatest('FETCH_TASK', fetchTask);
    yield takeLatest('NEW_TASK', newTask);
    yield takeLatest('COMPLETE_TASK', completeTask);
    yield takeLatest('PROJECT_TASK', projectTask);
    yield takeLatest('DELETE_TASK', deleteTask);
}

// get all tasks for user
function* fetchTask(action){
    console.log('in fetch task saga');
    try{
        const response = yield axios.get('/api/task');
        console.log('response in fetch task is:', response);
        yield put({type: 'PROJECT_ID', payload: response.data});//reducer needs to be made
    }catch{
        console.log('error in fetch task saga.');
    }
}

// saga for post of new tasks
function* newTask(action){
    console.log('in Post task saga');
    try{
        yield axios.post(`/api/task/`, action.pay);
        yield put({ type: 'FETCH_TASK' })
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
        yield axios.put(`/api/task/:id`, action.payload);
        yield put({ type: 'FETCH_TASK'})
    }catch{
        console.log('error in post task saga.');
    }
}

//delete task
function* deleteTask(action){
    console.log('in delete task saga');
    try{
        yield axios.delete(`/api/task/${action.payload.id}`)
        yield put({ type: 'FETCH_TASK'})
    }catch{
        console.log('error in delete task saga.');
    }
}

export default taskSaga;