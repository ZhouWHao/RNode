import { POSTDATA,FETCH_POST_SUCCEEDED ,FETCH_POST_FAILURE} from "../constants/home"
const initialState = {
    isFetching:false,
    error:null,
    home:null
}
const home = (state=initialState,action={}) => {
    switch(action.type){
        case POSTDATA:
            return{
                isFetching:true,
                error:null,
                home:null,
            }
        case FETCH_HOME_SUCCEEDED:
            return{
                isFetching:false,
                error:null,
                home:action.home
            }
        case FETCH_HOME_FAILURE:
            return{
                isFetching:false,
                error:action.error,
                home:null
            }
        default:return state
    }
}
export default home;