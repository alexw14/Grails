import React from 'react';

const CheckOutButton = (props) => {
  return (
    <button 
      className="btn waves-effect waves-light transparent"
      onClick={() => props.onSuccess()}
      style={{color: '#000'}}
    >
      Checkout
    </button>
  );
};

export default CheckOutButton;