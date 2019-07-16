import React from 'react';
import UtilButton from '../utils/button';
import Login from './login';

const RegisterLogin = () => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h1>New Customer</h1>
            <p>Hello New Customer</p>
            <UtilButton 
              type="default"
              title="Create an account"
              linkTo="/register"
              addStyles={{
                margin:"10px 0 0 0"
              }}
            />
          </div>
          <div className="right">
              <h2>Registered Customers</h2>
              <p>If you have an account, please log in.</p>
              <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;