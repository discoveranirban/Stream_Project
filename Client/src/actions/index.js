import streams from '../apis/streams'

export const changeStat=(val,id)=>{
    if(val){
        return{
            type:'SIGN_IN',
            payload:{
                status:true,
                id:id
            }
        }
    }
    else{
        return{
            type:'SIGN_OUT',
            payload:{
                status:false,
                id:null
            }
        }
    }
}

export const createStream = (formValues)=>{
    return async (dispatch,getState)=>{         
        const { userId }=getState().logStat;
        const response=await streams.post('/streams',{...formValues,userId})
        dispatch({
            type:'CREATE_STREAM',
            payload:response.data
        })
    }
}

// when action creator return function it gets called by two parameters, dispatch function and getState function
// which gives us access to all of our state. so we pull out UserID from there.
// to add userId to formValues object we use ES6 syntax. We spread out all the formValues key value pairs and add userId to it

export const fetchStreams = ()=>{
    return async (dispatch)=>{
        const response=await streams.get('/streams')
        dispatch({
            type:'FETCH_STREAMS',
            payload:response.data
        })
    }
}

export const fetchStream = (id)=>{
    return async (dispatch)=>{
        const response=await streams.get(`/streams/${id}`)
        dispatch({
            type:'FETCH_STREAM',
            payload:response.data
        })
    }
} 

export const editStream=(id,formValues)=>{
    return async (dispatch)=>{
        const response=await streams.put(`/streams/${id}`,formValues)
        dispatch({
            type:'EDIT_STREAM',
            payload:response.data
        })
    }
}

export const deleteStream=(id)=>{
    return async (dispatch)=>{
        await streams.delete(`/streams/${id}`)
        dispatch({
            type:'DELETE_STREAM',
            payload:id
        })
    }
}