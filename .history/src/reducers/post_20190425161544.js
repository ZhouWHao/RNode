import { POSTDATA,FETCH_POST_SUCCEEDED ,FETCH_POST_FAILURE} from "../constants/home"
const initialState = {
    isFetching:false,
    error:null,
    post:null
}
const home = (state=initialState,action={}) => {
    switch(action.type){
        case POSTDATA:
            return{
                isFetching:true,
                error:null,
                post:null,
            }
        case FETCH_POST_SUCCEEDED:
            return{
                isFetching:false,
                error:null,
                post:action.post
            }
        case FETCH_POST_FAILURE:
            return{
                isFetching:false,
                error:action.error,
                post:null
            }
        default:return state
    }
}
export default post;