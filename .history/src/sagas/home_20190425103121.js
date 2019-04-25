//redux-saga/effects提供的监听异步action，并传入回调函数进行处理
import {takeEvery,take,takeLatest,put,call,all} from 'redux-saga/effects';
import axios from 'axios';
import {HOMEDATA,FETCH_HOME_SUCCEEDED ,FETCH_HOME_FAILURE} from '../constants/home';

 //监听查询操作异步action的回调函数
function* FetchHome(){
    //监听获取
    while(true) {

    }
    
}
export function* watchFetchHome(){
    yield takeEvery(HOMEDATA,FetchHome)
}
