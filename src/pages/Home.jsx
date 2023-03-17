import React from 'react';
import { useNavigate } from 'react-router-dom';
import withAuth from '../helpers/withAuth';
import parseJwt from '../helpers/parserJwt'

const Profile = () => {
  const token = localStorage.getItem('token');
  const decodedToken = parseJwt(token);
  const { username } = decodedToken;
  
  return (
    <div>
      <h1>Home</h1>
      <p>username: {username}</p>
    </div>
  );
};

export default withAuth(Profile);
