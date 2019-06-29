import React from 'react';
import MyButton from '../utils/button';

const RegisterLogin = () => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h1>New Customer</h1>
            <p>Hello New Customer</p>
            <MyButton 
              type="default"
              title="Create an account"
              linkTo="/registeraccount"
              addStyles={{
                margin:"10px 0 0 0"
              }}
            />
          </div>
          <div className="right">
              <h2>Registered Customers</h2>
              <p>If you have an account, please log in.</p>
              LOGIN
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;