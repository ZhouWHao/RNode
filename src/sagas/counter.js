//redux-saga/effects提供的监听异步action，并传入回调函数进行处理
import {takeEvery,takeLatest,put,call,all} from 'redux-saga/effects';
import {ADDDATAASYNC,ADDDATA} from '../constants/counter';
//通过promise定义一个延时函数
const delay = (ms) => new Promise(resolve => setTimeout(resolve,ms))
//监听添加操作异步action的回调函数
function* addDataAsync(){
   yield call(delay,2000);
   yield put({type:ADDDATA});//发起一个dispatch，传入action为{type:ADDDATA}对象
}
//用于处理监听异步action的generator函数。
export function* watchAddDataAsync(){
    yield takeEvery(ADDDATAASYNC,addDataAsync);
 }
