import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../features/auth/authActions';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { loading, error, userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  
  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
      navigate('/');
    }
  }, [navigate, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email, password };
    console.log(data);
    dispatch(userLogin(data));
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', position: 'relative', top: '100px' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Email:
            <input
              type="text"
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
              Logging in...
            </span>
          ) : (
            'Login'
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

export default LoginForm;
