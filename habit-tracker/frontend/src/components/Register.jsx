import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const handleRegister = (e) => {
    e.preventDefault();

    dispatch(register({ username, password }));

    // If registration is successful, navigate to login page
    if (!error) {
      navigate('/login');
    }
  };

  return (
    <div className="login-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            dispatch(clearError());
          }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            dispatch(clearError());
          }}
          required
        />
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '8px' }}>{error}</p>}
      <p>
        Already have an account?{' '}
        <a href="/login" style={{ color: 'blue' }}>
          Login here
        </a>
      </p>
    </div>
  );
}
