import { combineReducers } from 'redux';

const logStat=(stat=false,action)=>{
    if(action==='SIGN_OUT'){
        return action.payload
    }
    else if(action==='SIGN_IN'){
        return action.payload
    }
    return stat;
}

export default combineReducers({
    logStat:logStat
})
