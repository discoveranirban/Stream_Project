import _ from 'lodash'

export default (state={},action)=>{
    switch(action.type){
        case 'FETCH_STREAMS':
            return {...state, ..._.mapKeys(action.payload,'id')}  // ...state takes all the old values and mapKeys creates an object with id as keys..
        case 'FETCH_STREAM':                                            // mapKeys also returns an object, so ... before _. is taking out all the key value pairs and adding them to the main object 
            return {...state,[action.payload.id]:action.payload}; // KEY INTERPOLATION SYNTAX..since we have no idea what the key will be,
        case 'CREATE_STREAM':                                       //  which is the stream we want to fetch here, we can't write action.payload.id:action.payload 
            return {...state,[action.payload.id]:action.payload};   // because action.payload.id will give a string, like '1'...but to assign a key to an object 
        case 'EDIT_STREAM':                                         // we can't use string a object key...therefore we have to use [action.payload.id]
            return {...state,[action.payload.id]:action.payload};
        case 'DELETE_STREAM':
            return _.omit(state,action.payload)
        
        default:
            return state;
    }
}