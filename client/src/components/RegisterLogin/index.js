import React from 'react';
import Login from './login';

const RegisterLogin = () => {
  return (
    <div className="login-page-wrapper">
      <div className="container">
        <div className="register-login-container">
          <div className="left-section">
            <div
              style={{
                background: `url(/images/featured/bred1back.jpeg)`,
                width: '100%',
                height: '400px',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain'
              }}
            />
          </div>
          <div className="right-section">
            <div className="login-title">Log in</div>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;