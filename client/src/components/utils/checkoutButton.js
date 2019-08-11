import React from 'react';

const CheckOutButton = (props) => {
  return (
    <div onClick={() => props.onSuccess()}>
      Checkout
    </div>
  );
};

export default CheckOutButton;