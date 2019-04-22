//redux-saga/effects提供的监听异步action，并传入回调函数进行处理
import {takeEvery,takeLatest,put,call,all} from 'redux-saga/effects';
import axios from 'axios';
import {GETUSER,GETTODOS,FETCH_USER_SUCCEEDED,FETCH_USER_FAILURE} from '../constants/user';
//通过promise定义一个延时函数
const delay = (ms) => new Promise(resolve => setTimeout(resolve,ms))

 //监听查询操作异步action的回调函数
function* FetchUser(){
    //多个异步请求的并发执行使用以下方法
    // const [todos,user] = yield all([
    //    call(axios.get,'https://jsonplaceholder.typicode.com/todos'),
    //    call(axios.get,'https://jsonplaceholder.typicode.com/users'),
    // ])
    try{
        const user = yield call(axios.get,"https://jsonplaceholder.typicode.com/users")
        yield put({type:FETCH_USER_SUCCEEDED,user:user}) //相当于dispatch一个action,并把值传过去
    }catch(e){
        yield put({type:FETCH_USER_FAILURE,error:e.message}) //相当于dispatch一个action,并把值传过去
        console.dir(e);
    }
   
}
function* FetchTodos(){
    const todos = yield call(axios.get,"https://jsonplaceholder.typicode.com/todos")
    console.log(todos);
}
export function* watchFetchUser(){
    yield takeEvery(GETUSER,FetchUser)
}
export function* watchFetchTodos(){
    yield takeEvery(GETTODOS,FetchTodos)
}