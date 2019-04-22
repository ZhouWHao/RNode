
import {ADDDATA,ADDDATAASYNC} from '../constants/counter';
export const addData = () => {
 return {
     type:ADDDATA
 }
}
export const addDataAsync = () => {
    return {
        type:ADDDATAASYNC
    }
}
