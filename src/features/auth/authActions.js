import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit'


// const url='http://localhost:5000'
const url = 'https://sperax-fullstack-blockchain-developer.onrender.com'

 
export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ firstName, email, password }, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        await axios.post(`${url}/api/user/register`, { firstName, email, password }, config);
      } catch (error) {
        if (error.response && error.response.status === 409) {
          // Handle 'User already exists' specifically
          alert('User Already Exist');
          return rejectWithValue('User already exists');
        } else if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );
  
export const userLogin=createAsyncThunk('auth/login',
    async({email,password},{rejectWithValue})=>{
        try{
            const config={
                headers:{
                    'Content-Type':'application/json',
                },
            }
            console.log(email,password)
            const {data} = await axios.post(`${url}/api/user/login`,{email,password},config)
            localStorage.setItem('userToken',data.userToken)
            alert('Login Successfully');
            return data;
        }
        catch(error){
            if(error.response && error.response.data.message){
                alert(error.response.data.message)
                return rejectWithValue(error.response.data.message)
            }else{
                return rejectWithValue(error.message);
            }
        }
    }
)