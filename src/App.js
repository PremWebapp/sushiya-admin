import React from 'react';
import './App.css';
import './vendor/fontawesome-free/css/all.css';
import './css/sb-admin-2.css';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './config/privateRoute';
import GlobalRoot from './globalRoot';
import { Login } from './features/admin/authentication/login';
import { ToastContainer } from 'react-toastify';
import 'antd/dist/antd.css';

function App() {

  return (
    <div className="App">
      <ToastContainer  position="top-right" />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route exact path="admin/*" element={<GlobalRoot/>} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
