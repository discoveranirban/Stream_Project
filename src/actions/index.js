// export const makeSignIn=()=>{
//     return{
//         type:'SIGN_IN',
//         payload:true
//     }
// }

// export const makeSignOut=()=>{
//     return{
//         type:'SIGN_OUT',
//         payload:false
//     }
// }

export const changeStat=(val)=>{
    if(val){
        return{
            type:'SIGN_IN',
            payload:true
        }
    }
    else{
        return{
            type:'SIGN_OUT',
            payload:false
        }
    }
}