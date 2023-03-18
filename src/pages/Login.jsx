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
        const token = response.data.token;

        //set JWT token to local
        localStorage.setItem("token", token);

        navigate('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="row">
      <h1>Login</h1>
      <div className="col-12">
        <label className="form-label">Username</label>
        <input type="text" className="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="col-12">
        <label className="form-label">Password</label>
        <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="col-12 mt-2">
        <button onClick={handleLogin} className="btn btn-primary">Sign in</button>
      </div>
    </div>
  );
};

export default LoginPage;