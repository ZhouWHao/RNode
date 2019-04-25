//redux-saga/effects提供的监听异步action，并传入回调函数进行处理
import {takeEvery,take,takeLatest,put,call,all} from 'redux-saga/effects';
import axios from 'axios';
import {HOMEDATA,FETCH_HOME_SUCCEEDED ,FETCH_HOME_FAILURE} from '../constants/home';

 //监听查询操作异步action的回调函数
function* FetchHome(){
    //监听获取
        const {canshu} = take('HOMEDATA');
        console.log("render",canshu,a);
        // {params:{type:action.type}}
        try{
            console.log("render")
            const home = yield call(axios.get,"https://cnodejs.org/api/v1/topics")
            yield put({type:FETCH_HOME_SUCCEEDED,home:home.data.data}) //相当于dispatch一个action,并把值传过去
        }catch(e){
            yield put({type:FETCH_HOME_FAILURE,error:e.message}) //相当于dispatch一个action,并把值传过去
            console.dir(e);
        }
}
export function* watchFetchHome(){
    yield takeEvery(HOMEDATA,FetchHome)
}
