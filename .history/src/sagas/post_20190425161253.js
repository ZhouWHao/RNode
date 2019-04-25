//redux-saga/effects提供的监听异步action，并传入回调函数进行处理
import {takeEvery,takeLatest,put,call,all} from 'redux-saga/effects';
import axios from 'axios';
import {POSTDATA,FETCH_POST_SUCCEEDED ,FETCH_POST_FAILURE} from '../constants/home';

 //监听查询操作异步action的回调函数
function* FetchPost(action){
    try{
        const post = yield call(axios.get,"https://cnodejs.org/api/v1/topics",{params:action.params})
        yield put({type:FETCH_POST_SUCCEEDED,post:post.data.data}) //相当于dispatch一个action,并把值传过去
    }catch(e){
        yield put({type:FETCH_POST_FAILURE,error:e.message}) //相当于dispatch一个action,并把值传过去
        console.dir(e);
    }
}
export function* watchFetchHome(){
    yield takeEvery(POSTDATA,FetchPost)
}
