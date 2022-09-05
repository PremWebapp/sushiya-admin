import React from 'react';
import './App.css';
import './vendor/fontawesome-free/css/all.css';
import './css/sb-admin-2.css';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './config/privateRoute';
import GlobalRoot from './globalRoot';
import { Login } from './features/admin/authentication/login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route exact path="Admin/*" element={<GlobalRoot/>} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
