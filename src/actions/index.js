
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