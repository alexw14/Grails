import React from 'react';

const CheckOutButton = (props) => {
  return (
    <button onClick={() => props.onSuccess()}>
      Checkout
    </button>
  );
};

export default CheckOutButton;