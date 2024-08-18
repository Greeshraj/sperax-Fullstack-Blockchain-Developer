import {createSlice, isRejected} from '@reduxjs/toolkit'
import { registerUser } from './authActions'
import { userLogin } from './authActions'

 
const userToken = localStorage.getItem('userToken')?localStorage.getItem('userToken'):null;
const initialState={
    loading:false,
    userInfo:null,
    userToken,
    error:null,
    success:false,
}
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout:(state)=>{
            localStorage.removeItem('userToken')
            state.loading=false
            state.userInfo=null
            state.userToken=null
            state.error=null
            // ..logout reducer
        },
        setCredentials:(state,{payload})=>{
            state.userInfo=payload
        },
    },
    // extraReducers:{
    //     [registerUser.pending]:(state)=>{
    //         state.loading = true;
    //         state.error = null;
    //     },
    //     [registerUser.fulfilled]:(state,{payload})=>{
    //         state.loading = false;
    //         state.success=true;
    //     },
    //     [registerUser.rejected]:(state,{payload})=>{
    //         state.loading=false;
    //         state.error=payload;
    //     }
    // }
    extraReducers:(builder)=>{
        builder
        .addCase(userLogin.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(userLogin.fulfilled,(state,{payload})=>{
            state.loading=false;
            state.userInfo=payload;
            state.userToken=payload.userToken
        })
        .addCase(userLogin.rejected,(state,{payload})=>{
            state.loading=false;
            state.error=payload;
        })
        .addCase(registerUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(registerUser.fulfilled,(state,{payload})=>{
            state.loading=false;
            state.success=true;
        })
        .addCase(registerUser.rejected,(state,{payload})=>{
            state.loading=false;
            state.error=payload;
        })
    }
})
export const {logout,setCredentials} = authSlice.actions
export default authSlice.reducer

