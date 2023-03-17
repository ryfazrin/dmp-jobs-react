import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import jwt from 'jsonwebtoken';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const loginPayload = { username, password }
    axios.post("http://localhost:5000/api/login", loginPayload)
     .then(response => {
      console.log(response.data);
       //get token from response
       const token  =  response.data.token;
 
       //set JWT token to local
       localStorage.setItem("token", token);
 
       //set token to axios common header
      //  setAuthToken(token);
      navigate('/');
 
//redirect user to home page
      //  window.location.href = '/'
     })
     .catch(err => console.log(err));
    // try {
    //   const response = await fetch('http://localhost:5000/api/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ username, password }),
    //   });

    //   const { token } = await response.json();
    //   localStorage.setItem('token', token);
    //   navigate('/');
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <div>
      <h1>Login</h1>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;