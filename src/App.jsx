import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import LoginPage from './pages/Login';
import parseJwt from './helpers/parserJwt';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

function App() {
  const token = localStorage.getItem('token');
  const decodedToken = parseJwt(token);
  const { username } = decodedToken;

  return (
    <>
      <header>
        <p>{username}</p>
      </header>
      <main>
        <RouterProvider router={router} />
      </main>
    </>
  )
}

export default App
