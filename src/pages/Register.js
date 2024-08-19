import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../features/auth/authActions';

const Register = () => {
  const { loading, userInfo, error, success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      alert('Registered Successfully');
      navigate('/login');
    }
    if (userInfo) {
      navigate('/user-profile');
    }
  }, [navigate, userInfo, success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    const data = {
      firstName,
      email: email.toLowerCase(),
      password,
    };
    console.log(data);
    dispatch(registerUser(data));
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', position: 'relative', top: '100px' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>
            User Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
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
        <button
          type="submit"
          style={{ padding: '10px 20px', cursor: loading ? 'not-allowed' : 'pointer', position: 'relative' }}
          disabled={loading}
        >
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span
                className="spinner"
                style={{
                  width: '16px',
                  height: '16px',
                  border: '3px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '50%',
                  borderTopColor: '#000',
                  animation: 'spin 1s linear infinite',
                  marginRight: '8px'
                }}
              ></span>
              Registering...
            </span>
          ) : (
            'Register'
          )}
        </button>
      </form>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Register;
