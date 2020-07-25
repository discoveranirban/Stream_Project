import { combineReducers } from 'redux';

const INITITAL_STATE={
    isSignedIn:false,
    userId:null
}

const logStat=(state=INITITAL_STATE,action)=>{
    if(action.type==='SIGN_OUT'){
        return {
            ...state,
            isSignedIn:action.payload.status,
            userId:action.payload.id
        }
    }
    else if(action.type==='SIGN_IN'){
        return {
            ...state,
            isSignedIn:action.payload.status,
            userId:action.payload.id
        }
    }
    return state;
}

export default combineReducers({
    logStat:logStat
})
