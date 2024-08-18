import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useMatch, useNavigate } from 'react-router-dom';
import {registerUser} from '../features/auth/authActions';


const Register = () => {

  const {loading,userInfo,error,success}=useSelector((state)=>state.auth)
  const dispatch = useDispatch()

  const [firstName, setfirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate=useNavigate()

  useEffect(()=>{
    if(success){
      alert('Register Successfully')
      navigate('/login');
    }
    if(userInfo){
      navigate('/user-profile')
    }
  },[navigate,userInfo,success])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const data={
      firstName,email,password
    }
    // Handle form submission logic here
    console.log('Username:', firstName);
    console.log('Email:', email);
    console.log('Password:', password);

    data.email=data.email.toLowerCase()
    console.log(data);
    dispatch(registerUser(data));
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' ,position:'relative',top:'100px'}}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>
            User Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              style={{ width: '100%', padding: '8px', margin: '5px 0' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '8px', margin: '5px 0' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '8px', margin: '5px 0' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ width: '100%', padding: '8px', margin: '5px 0' }}
            />
          </label>
        </div>
        <button type="submit" style={{ padding: '10px 20px', cursor:'pointer' }}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
