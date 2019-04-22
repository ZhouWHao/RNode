import {ADDDATA} from '../constants/counter';
const counter = (state=1,action={}) => {
   switch(action.type){
       case ADDDATA:
            return state+1
       default:
            return state;
   }
}
export default counter;