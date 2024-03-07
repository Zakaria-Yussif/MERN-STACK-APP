// App.js

import './App.css';
import Header from './Component/Header.js';
import Display from './Component/Display';
import Footer from './Component/Footer';
import Book from './Pages/Book';
import Login from './Pages/Login';
import ProtectedRoute from './Component/ProtectedRoute';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import Profile from './Component/Profile';
import MinimalLayout from './Component/MinimalLayout'; // Import the new layout
import RegisterPage from './Pages/RegisterPage.js';
import ResetPass from './Pages/ResetPass.js';
import EmailPassReset from './Pages/EmailPassReset.js';
import AdminAcc from './Component/AdminAcc.js';
import AI from './Pages/AI.js';
import Zoom from './Pages/Zoom.js';

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    let storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Fragment>
            {/* Routes with Header and Footer */}
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <Display />
                  <Footer />
                </>
              }
            />
            
            <Route
              path="/adminAcc"
              element={
                <>
                  <Header />
                  <AdminAcc />
                  <Footer />
                </>
              }
            />
            {/* Routes without Header and Footer (using MinimalLayout) */}
            <Route
              path="/login"
              element={
                <MinimalLayout>
                  <Login />
                </MinimalLayout>
              }
            />
            <Route
              path="/AI_support"
              element={
                <MinimalLayout>
                  <AI />
                </MinimalLayout>
              }
            />
            <Route
              path="/zoom"
              element={
                <MinimalLayout>
                  <Zoom />
                </MinimalLayout>
              }
            />
            <Route
              path="/profilePicture"
              element={
                <MinimalLayout>
                  <Profile />
                </MinimalLayout>
              }
            />
            <Route
              path="/emailSubmit"
              element={
                <MinimalLayout>
                  <EmailPassReset />
                </MinimalLayout>
              }
            />
            <Route
              path="/welcomeMessage"
              element={
                <MinimalLayout>
                  <RegisterPage />
                </MinimalLayout>
              }
            />
            <Route
              path="/resetPassword"
              element={
                <MinimalLayout>
                  <ResetPass />
                </MinimalLayout>
              }
            />
            <Route
              exact
              path="/book"
              element={
                <MinimalLayout>
                  <ProtectedRoute>
                    <Book token={token} />
                  </ProtectedRoute>
                </MinimalLayout>
              }
            />
          </Fragment>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
