import React from 'react';
import { Navigate } from 'react-router-dom';

const isExpiredJWT = (token) => {
  try {
    const decodedJWT = parseJwt(token)
    const miliseconds = dateNow.getTime() / 1000

    console.log(decodedJWT);
    if(decodedJWT.exp < miliseconds){
      return true
    } else {
      return false
    }
  } catch (e) {
    return false
  }
}

const withAuth = (Component) => {
  const AuthRoute = (props) => {
    const token = localStorage.getItem('token');

    if (!token || isExpiredJWT(token)) {
      return <Navigate to="/login" />;
    }

    return <Component {...props} />;
  };

  return AuthRoute;
};

export default withAuth;
